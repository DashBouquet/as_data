const { pathOr, flatten } = require('ramda')


const { ADACCOUNT_FIELDS, CAMPAIGN_FIELDS, AD_FIELDS, ADSET_FIELDS, INSIGHTS_FIELDS, ADS_INSIGHTS_FIELDS, ADSET_INSIGHTS_FIELDS } = require('./constants')

// TODO: add time_range for insights

async function getAdaccounts(FB) {
  return await FB.api_promise('me/adaccounts', { fields: ADACCOUNT_FIELDS })
}

async function getCampaigns(FB) {
  const campaignIds = await FB.api_promise('me/adaccounts', { fields: 'campaigns{id}'})
    .then(({data}) => data.map(pathOr([], ['campaigns', 'data'])))
    .then(flatten)
  return await Promise.all(campaignIds.map(async i => ({
      campaign: await FB.api_promise(`${i.id}`, { fields: CAMPAIGN_FIELDS }),
      insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS }),
    })))
}

async function getAds(FB) {
  const adsIds = await FB.api_promise('me/adaccounts', { fields: 'ads{id}' })
    .then(({data}) => data.map(pathOr([], ['ads', 'data'])))
    .then(flatten)
  return await Promise.all(adsIds.map(async i => ({ 
    ad: await FB.api_promise(i.id, { fields: AD_FIELDS }),
    insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS })
  })))
}

async function getAdsets(FB) {
  const adsetsIds = await FB.api_promise('me/adaccounts', { fields: 'adsets{id}' })
    .then(({data}) => data.map(pathOr([], ['adsets', 'data'])))
    .then(flatten)
  return await Promise.all(adsetsIds.map(async i => ({
    adset: await FB.api_promise(i.id, { fields: ADSET_FIELDS }),
    insights: await FB.api_promise(`${i.id}/insights`, { fields: ADS_INSIGHTS_FIELDS })
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
}