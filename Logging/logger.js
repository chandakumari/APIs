const log4js = require('log4js');

// Logger configuration
log4js.configure({
  appenders: {
    fileAppender: { type: 'file', filename: './temp3.log' },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['fileAppender', 'console'], level: 'info' },
  },
});
const logger = log4js.getLogger();
module.exports = logger;