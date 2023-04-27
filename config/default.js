const { name } = require('../package.json');

module.exports = {
  APP_NAME: name,
  MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
