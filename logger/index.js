const { configure, getLogger } = require('log4js');
const { LOGGER_FILE_PATH } = require('../.env')

const logger = getLogger()

configure({
  appenders: { cheese: { type: 'file', filename: LOGGER_FILE_PATH } },
  categories: { default: { appenders: ['cheese'], level: 'trace' } }
});

module.exports = logger;
