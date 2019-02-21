const { FB } = require('fb')
const fs = require('fs');

const { getAdaccounts, getCampaigns, getAds, getAdsets, } = require('./api')
const access_token = ''


// promisification FB.api
FB.api_promise = (path, configs) => new Promise((resolve, reject) => {
  FB.api(path, configs, (res) => resolve(res))
})

FB.setAccessToken(access_token)
FB.options({version: 'v3.2'})


// start script
async function start() {
  // const adaccounts = await getAdaccounts(FB)
  // const campaigns = await getCampaigns(FB)
  // const ads = await getAds(FB)
  const adsets = await getAdsets(FB)

  // fs.writeFile("./facebook/data/adaccounts.json", JSON.stringify(adaccounts, null, 2), () => { console.log("The file was saved!") });
  // fs.writeFile("./facebook/data/campaigns.json", JSON.stringify(campaigns, null, 2), () => { console.log("The file was saved!") });
  // fs.writeFile("./facebook/data/ads.json", JSON.stringify(ads, null, 2), () => { console.log("The file was saved!") });
  fs.writeFile("./facebook/data/adsets.json", JSON.stringify(adsets, null, 2), () => { console.log('saved!') });
}

start()
