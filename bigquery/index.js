const {BigQuery} = require('@google-cloud/bigquery')

const logger = require('../logger')
const { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID, FB_DATASET_ID } = require('../.env')

const bigquery = new BigQuery({
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
  projectId: PROJECT_ID,
});

async function createTables() {
  const adaccount_schema = require('./schema/facebook-adaccount')
  const ad_schema = require('./schema/facebook-ad')
  const adset_schema = require('./schema/facebook-adset')
  const campaign_schema = require('./schema/facebook-campaign')
  const insight_schema = require('./schema/facebook-insight')

  const [table1] = await bigquery.dataset(FB_DATASET_ID).createTable(`adaccount_${(Math.random()*1000).toFixed()}`, {schema: adaccount_schema})
  const [table2] = await bigquery.dataset(FB_DATASET_ID).createTable(`ad_${(Math.random()*1000).toFixed()}`, {schema: ad_schema})
  const [table3] = await bigquery.dataset(FB_DATASET_ID).createTable(`adset_${(Math.random()*1000).toFixed()}`, {schema: adset_schema})
  const [table4] = await bigquery.dataset(FB_DATASET_ID).createTable(`campaign_${(Math.random()*1000).toFixed()}`, {schema: campaign_schema})
  const [table5] = await bigquery.dataset(FB_DATASET_ID).createTable(`insight_${(Math.random()*1000).toFixed()}`, {schema: insight_schema})
  console.log(`
    Table ${table1.id} created.
    Table ${table2.id} created.
    Table ${table3.id} created.
    Table ${table4.id} created.
    Table ${table5.id} created.
  `)
}

async function insertIntoTable (table, object) {
  if (!table) { return }
  if (!object) { return }
  
  const keys = Object.keys(object)
  const query = `
    INSERT INTO ${table} (${keys.join(',')})
      VALUES (${keys.map(i => `"${object[i]}"`).join(',')});
  `
  try {
    await bigquery.query({ query });
  } catch(e) {
    logger.warn('The request will be repeated', {table, object}, e.message)
    return new Promise((reslove) => { setTimeout(() => { reslove(insertIntoTable(table, object)) }, 1000 * 6) })
  }
}

module.exports = {
  createTables,
  insertIntoTable,
}
