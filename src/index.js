const { indexBy, prop, pathOr, omit } = require('ramda')
const { format, subDays, } = require('date-fns');
const CronJob = require('cron').CronJob;


const { getAdaccounts, getCampaigns, getAds, getAdsets, getFullAdaccountInfo } = require('../facebook/api')

const { FB_CLIENT_ID, FB_CLIENT_SECRET, fb_exchange_token, fb_await_time_ms, cron_fetch_time } = require('../.env')
const { FB_INSIGHT_TABLE_NAME, FB_CAMPAIGN_TABLE_NAME, FB_ADSET_TABLE_NAME, FB_AD_TABLE_NAME, FB_ADACCOUNT_TABLE_NAME } = require('../.env')

const adaccount_schema = indexBy(prop('name'), require('../bigquery/schema/facebook-adaccount'))
const ad_schema = indexBy(prop('name'), require('../bigquery/schema/facebook-ad'))
const adset_schema = indexBy(prop('name'), require('../bigquery/schema/facebook-adset'))
const campaign_schema = indexBy(prop('name'), require('../bigquery/schema/facebook-campaign'))
const insight_schema = indexBy(prop('name'), require('../bigquery/schema/facebook-insight'))

const { createTables, insertIntoTable } = require('../bigquery')
const logger = require('../logger')

const { FB } = require('fb')

function promisification(path, configs) {
  return new Promise(resolve => {
    FB.api(path, configs, (res) => {
      if (res.error) {
        if (res.error.message === '(#17) User request limit reached' || res.error.message === 'getaddrinfo ENOTFOUND graph.facebook.com graph.facebook.com:443') {
          logger.warn(res.error.message, 'The request will be repeated', {path, configs})
          setTimeout(() => resolve(promisification(path, configs)), fb_await_time_ms)
        } else {
          logger.error(res.error.message, {path, configs})
          resolve(res)
        }
      } else {
        resolve(res)
      }
    })
  })
}

FB.api_promise = promisification;


async function run(options) {

  const { since, until } = pathOr({}, ['insights', 'time_range'], options)

  const data = await getFullAdaccountInfo(FB, options).then(({data}) => data)

  await Promise.all(data.map(async (info) => {
    const adaccount = omit(['ads', 'campaigns', 'insights'], info)
    const adaccount_insights = pathOr({}, ['insights', 'data', '0'], info)

    const campaigns = pathOr([], ['campaigns', 'data'], info)
    const ads = pathOr([], ['ads', 'data'], info)
    const adsets = pathOr([], ['adsets', 'data'], info)


    adaccount.error ? console.log(adaccount) : await insertIntoTable(FB_ADACCOUNT_TABLE_NAME, adaccount, adaccount_schema)
    adaccount.error || adaccount_insights.error ? console.log(adaccount_insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, { ...adaccount_insights, descriptor: 'ADACCOUNT', id: `insights/${adaccount.id}/${since}/${until}` }, insight_schema)

    await Promise.all(campaigns.map(async c => {
      const campaign = omit(['insights'], c)
      const campaign_insights = pathOr({}, ['insights', 'data', '0'], c)
      campaign.error ? console.log(campaign) : await insertIntoTable(FB_CAMPAIGN_TABLE_NAME, campaign, campaign_schema)
      campaign.error || campaign_insights.error ? console.log(campaign_insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, { ...campaign_insights, descriptor: 'CAMPAIGN', id: `insights/${campaign.id}/${since}/${until}` }, insight_schema)
    }))

    await Promise.all(ads.map(async a => {
      const ad = omit(['insights'], a)
      const ad_insights = pathOr({}, ['insights', 'data', '0'], a)
      ad.error ? console.log(ad) : await insertIntoTable(FB_AD_TABLE_NAME, ad, ad_schema)
      ad.error || ad_insights.error ? console.log(ad_insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, { ...ad_insights, descriptor: 'CAMPAIGN', id: `insights/${ad.id}/${since}/${until}` }, insight_schema)
    }))

    await Promise.all(adsets.map(async a => {
      const adset = omit(['insights'], a)
      const adset_insights = pathOr({}, ['insights', 'data', '0'], a)
      adset.error ? console.log(ad) : await insertIntoTable(FB_ADSET_TABLE_NAME, adset, adset_schema)
      adset.error || adset_insights.error ? console.log(adset_insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, { ...adset_insights, descriptor: 'CAMPAIGN', id: `insights/${adset.id}/${since}/${until}` }, insight_schema)
    }))
  }))
}


async function fetchFacebookData(options) {
  return new Promise(resolve => {
    FB.api('oauth/access_token', { client_id: FB_CLIENT_ID, client_secret: FB_CLIENT_SECRET, grant_type: 'fb_exchange_token', fb_exchange_token }, function (res) {
      console.log(res);
      if(!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
      }
      FB.setAccessToken(res.access_token)
      FB.options({version: 'v3.2'})
        resolve(run(options))
    })
  })
}

async function fetchOldData () {
  let date = new Date()
  const endDate = new Date('10-03-2018')

  console.log('current date', date)
  
  while (date.getTime() > endDate.getTime()) {
    await fetchFacebookData({ insights: { time_range: { 'since': format(subDays(date, 1), 'YYYY-MM-DD'), 'until': format(date, 'YYYY-MM-DD') } } })
    date = subDays(date, 1)
  }
}

fetchOldData()
