const { getQuery } = require('../core/database');
const { encrypt } = require('../helpers/bcrypt');

const create = async ({ name, email, password }) => {
  try {
    const success = await getQuery(`INSERT INTO users(name, email, password) VALUES
  ("${name}", "${email}", "${encrypt(password)}")`);

    return success;
  } catch (error) {
    return false;
  }
};

const findAll = async () => {
  const users = await getQuery('SELECT name, email FROM users LIMIT 1000');
  return users;
};

module.exports = { create, findAll };
