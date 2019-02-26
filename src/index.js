const { getAdaccounts, getCampaigns, getAds, getAdsets } = require('../facebook/api')

const { FB_CLIENT_ID, FB_CLIENT_SECRET, fb_exchange_token } = require('../.env')
const { FB_INSIGHT_TABLE_NAME, FB_CAMPAIGN_TABLE_NAME, FB_ADSET_TABLE_NAME, FB_AD_TABLE_NAME, FB_ADACCOUNT_TABLE_NAME } = require('../.env')

const { createTables, insertIntoTable } = require('../bigquery')
const logger = require('../logger')

const { FB } = require('fb')

function promisification(path, configs) {
  return new Promise(resolve => {
    FB.api(path, configs, (res) => {
      if (res.error) {
        if (res.error.message === '(#17) User request limit reached' || res.error.message === 'getaddrinfo ENOTFOUND graph.facebook.com graph.facebook.com:443') {
          logger.warn(res.error.message, 'The request will be repeated', {path, configs})
          setTimeout(() => resolve(promisification(path, configs)), 1000 * 60 * 15)
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

// facebook

async function run(options) {

  console.log('adaccounts')
  const adaccounts = await getAdaccounts(FB, options)
  await Promise.all(adaccounts.map(async ({adaccount, insights }) => {
    adaccount.error ? console.log(adaccount) : await insertIntoTable(FB_ADACCOUNT_TABLE_NAME, adaccount)
    insights.error ? console.log(insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, insights.data[0])
  }))
  delete(adaccounts)

  console.log('ads')
  const ads = await getAds(FB, options)
  await Promise.all(ads.map(async ({ad, insights }) => {
    ad.error ? console.log(ad) : await insertIntoTable(FB_AD_TABLE_NAME, ad)
    insights.error ? console.log(insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, insights.data[0])
  }))
  delete(ads)

  console.log('adsets')
  const adsets = await getAdsets(FB, options)
  await Promise.all(adsets.map(async ({adset, insights }) => {
    adset.error ? console.log(adset) : await insertIntoTable(FB_ADSET_TABLE_NAME, adset)
    insights.error ? console.log(insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, insights.data[0])
  }))
  delete(adsets)

  console.log('campaigns')
  const campaigns = await getCampaigns(FB, options)
  await Promise.all(campaigns.map(async ({campaign, insights }) => {
    campaign.error ? console.log(campaign) : await insertIntoTable(FB_CAMPAIGN_TABLE_NAME, campaign)
    insights.error ? console.log(insights) : await insertIntoTable(FB_INSIGHT_TABLE_NAME, insights.data[0])
  }))
  delete(campaigns)

  console.log('finish')
}


FB.api('oauth/access_token', { client_id: FB_CLIENT_ID, client_secret: FB_CLIENT_SECRET, grant_type: 'fb_exchange_token', fb_exchange_token }, function (res) {
  console.log(res);
  if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
  }
  FB.setAccessToken(res.access_token)
  FB.options({version: 'v3.2'})
  run()
});

// createTables()

// Table adaccount_592 created.
// Table ad_379 created.
// Table adset_278 created.
// Table campaign_309 created.
// Table insight_244 created.
