const { getQuery } = require('../core/database');

const create = async ({ name, email, password }) => {
  try {
    const success = await getQuery(`INSERT INTO users(name, email, password) VALUES
  ("${name}", "${email}", "${password}")`);

    return success;
  } catch (error) {
    return false;
  }
};

const findAll = async () => {
  const users = await getQuery('SELECT name, email, password FROM users');
  return users;
};

module.exports = { create, findAll };
