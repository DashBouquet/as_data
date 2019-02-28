const { pathOr, flatten } = require('ramda')


const { ADACCOUNT_FIELDS, CAMPAIGN_FIELDS, AD_FIELDS, ADSET_FIELDS, ADS_INSIGHTS_FIELDS } = require('./constants')

// TODO: add time_range for insights

/**
 * 
 * 1. Fo use insights parameters set them to options
 *    example: options = { insights: { time_range: { 'since': '2019-01-22', 'until': '2019-02-05' } } }
 * 
 */

async function getFullAdaccountInfo(FB, options) {
  const { since, until } = pathOr({}, ['insights', 'time_range'], options)

  if (!since && !until) { throw new Error('fields since and until are required') }

  const insightsFields = `insights.time_range({'until':'${until}', 'since':'${since}'}){${ADS_INSIGHTS_FIELDS}}`
  
  const fields = `${ADACCOUNT_FIELDS}, ${insightsFields},` +
    `campaigns{${CAMPAIGN_FIELDS}, ${insightsFields}},` +
    `ads{${AD_FIELDS}, ${insightsFields}},` +
    `adsets{${ADSET_FIELDS}, ${insightsFields}}`

  return await FB.api_promise('me/adaccounts', { fields })
}

async function getAdaccounts(FB, options) {
  const ids = await FB.api_promise('me/adaccounts', { fields: 'id' })
    .then(({data}) => data)

  return await Promise.all(ids.map(async i => ({
    adaccount: await FB.api_promise(`${i.id}`, { fields: ADACCOUNT_FIELDS }),
    insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS, ...pathOr({}, ['insights'], options) }),
  })))
}

async function getCampaigns(FB, options) {
  const campaignIds = await FB.api_promise('me/adaccounts', { fields: 'campaigns{id}'})
    .then(({data}) => data.map(pathOr([], ['campaigns', 'data'])))
    .then(flatten)
  return await Promise.all(campaignIds.map(async i => ({
      campaign: await FB.api_promise(`${i.id}`, { fields: CAMPAIGN_FIELDS }),
      insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS, ...pathOr({}, ['insights'], options) }),
    })))
}

async function getAds(FB, options) {
  const adsIds = await FB.api_promise('me/adaccounts', { fields: 'ads{id}' })
    .then(({data}) => data.map(pathOr([], ['ads', 'data'])))
    .then(flatten)
  return await Promise.all(adsIds.map(async i => ({ 
    ad: await FB.api_promise(i.id, { fields: AD_FIELDS }),
    insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS, ...pathOr({}, ['insights'], options) })
  })))
}

async function getAdsets(FB, options) {
  const adsetsIds = await FB.api_promise('me/adaccounts', { fields: 'adsets{id}' })
    .then(({data}) => data.map(pathOr([], ['adsets', 'data'])))
    .then(flatten)
  return await Promise.all(adsetsIds.map(async i => ({
    adset: await FB.api_promise(i.id, { fields: ADSET_FIELDS }),
    insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS, ...pathOr({}, ['insights'], options) })
  })))
}

// async function getCopies() {
//   return []
// }
// async function getInsights() {
//   return []
// }
// async function getStats() {
//   return []
// }
// async function getAdStudies() {
//   return []
// }
// async function getAdrulesGoverned() {
//   return []
// }
// async function getInsightsById(FB, id) {
//   return FB.api_promise(`${id}/insights`, { fields: ADS_INSIGHTS_FIELDS })
// }
// async function getCampaign(FB, campaign_id) {
//   return await FB.api_promise(campaign_id, { fields: CAMPAIGN_FIELDS })
// }



module.exports = {
  getAdaccounts,
  getCampaigns,
  getAds,
  getAdsets,
  getFullAdaccountInfo,
}