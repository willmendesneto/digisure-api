const conf = require('config');
const { Router } = require('express');
const { createUser, findAllUsers } = require('./controllers/user');

const router = new Router({
  strict: true,
  caseSensitive: true,
});

// core routes
router.get('/ping', (req, res) => {
  res.send({ alive: true });
});

router.get('/', (req, res) => {
  const API_URL = `${req.protocol}://${req.host}:${conf.get('PORT')}${req.baseUrl}`;

  req.log.info('Calling API Discovery endpoint');
  res.status(200).send({
    discovery: {
      url: `${API_URL}`,
      method: 'GET',
    },
    users: {
      create: {
        url: `${API_URL}/users/create`,
        method: 'POST',
      },
      list: {
        url: `${API_URL}/users`,
        method: 'GET',
      },
    },
  });
});

router.get('/users', (req, res) => {
  req.log.info('Calling Find All Users Endpoint');
  return findAllUsers(req, res);
});

router.post('/users/create', (req, res) => {
  req.log.info('Calling Create User Endpoint');
  return createUser(req, res);
});

module.exports = router;
