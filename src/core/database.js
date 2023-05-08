const conf = require('config');

const mysql = require('mysql');
const logger = require('../core/logger')();

const { promisify } = require('util');

let promiseQuery;
let connection;

const getConnection = async () => {
  try {
    if (!connection) {
      connection = mysql.createConnection({
        host: conf.get('MYSQL_DB_HOST'),
        user: conf.get('MYSQL_USER'),
        password: conf.get('MYSQL_PASSWORD'),
        database: conf.get('MYSQL_DATABASE'),
        debug: conf.get('IS_PRODUCTION'),
        connectTimeout: 50000,
      });
      const promiseGetConnection = promisify(connection.connect).bind(connection);
      await promiseGetConnection();
    }
    logger.info('Database Connected!');
    return connection;
  } catch (error) {
    logger.info('Database Error!');
    logger.info({ error });
    return null;
  }
};

const getQuery = async () => {
  if (!promiseQuery) {
    const conn = await getConnection();

    promiseQuery = promisify(conn.query).bind(conn);
  }

  return promiseQuery;
};

module.exports = {
  getConnection,
  getQuery,
};
