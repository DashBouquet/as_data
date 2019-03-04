const {BigQuery} = require('@google-cloud/bigquery')
const { format } = require('date-fns')

const logger = require('../logger')
const { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID, FB_DATASET_ID, big_query_await_time_ms } = require('../.env')

const bigquery = new BigQuery({
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
  projectId: PROJECT_ID,
});

const toFormat = (value, type) => {
  switch (type.toLowerCase()) {
    case 'string':
      return `"${value}"`
    case 'boolean':
      return value
    case 'datetime':
      return `"${format(value, 'YYYY-MM-DD')}"`
    case 'numeric':
      return Number(value)
    default:
      return `"${value}"`
  }
}

async function createTables() {
  const adaccount_schema = require('./schema/facebook-adaccount')
  const ad_schema = require('./schema/facebook-ad')
  const adset_schema = require('./schema/facebook-adset')
  const campaign_schema = require('./schema/facebook-campaign')
  const insight_schema = require('./schema/facebook-insight')

  const [table1] = await bigquery.dataset(FB_DATASET_ID).createTable(`adaccount`, {schema: adaccount_schema})
  const [table2] = await bigquery.dataset(FB_DATASET_ID).createTable(`ad`, {schema: ad_schema})
  const [table3] = await bigquery.dataset(FB_DATASET_ID).createTable(`adset`, {schema: adset_schema})
  const [table4] = await bigquery.dataset(FB_DATASET_ID).createTable(`campaign`, {schema: campaign_schema})
  const [table5] = await bigquery.dataset(FB_DATASET_ID).createTable(`insight`, {schema: insight_schema})
  console.log(`
    Table ${table1.id} created.
    Table ${table2.id} created.
    Table ${table3.id} created.
    Table ${table4.id} created.
    Table ${table5.id} created.
  `)
}

async function getRecordById (table, recordId) {
  const query = `SELECT * FROM ${table} WHERE id = "${recordId}";`
  try {
    const [rows] = await bigquery.query({ query, location: 'US' });
    return rows
  }
  catch (e) {
    if (e.message.includes('Exceeded rate limits')) {
      return new Promise(reslove => setTimeout(() => reslove(getRecordById(table, recordId), big_query_await_time_ms)))
    } else { throw e }
  }
}

async function insertIntoTable (table, object, schema) {
  if (!table) { return }
  if (!object) { return }

  const keys = Object.keys(object)

  if (keys.length === 2) { return } // the case when only insights.descriptor & insights.id comes

  const isAlreadyExist = (await getRecordById(table, object.id)).length > 0

  if (isAlreadyExist) {
    console.log('already exist', object.id)
    return
  }

  const query = `
    INSERT INTO ${table} (${keys.join(',')})
      VALUES (${keys.map(i => `${toFormat(object[i], schema[i].type)}`).join(',')});
  `
  try {
    await bigquery.query({ query });
  } catch(e) {
    if (e.message.includes('Exceeded rate limits')) {
      logger.warn('The request will be repeated', {table, object}, e.message)
      return new Promise((reslove) => { setTimeout(() => { reslove(insertIntoTable(table, object, schema)) }, big_query_await_time_ms) })
    } else {
      throw e
    }
  }
}

module.exports = {
  createTables,
  insertIntoTable,
  getRecordById
}
