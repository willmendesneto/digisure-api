const chai = require('chai');
const nock = require('nock');
const app = require('../../src/app');

describe('Integration: User endpoint', () => {
  let server;
  const now = ${Date.now()}
  const request = {
    email: `anothertest${now}@inexistentdomain.com`,
    name: `Some User - ${now}`,
    password: 'pass',
  };

  before(() => {
    server = app.listen();
  });

  after(() => server.close());

  afterEach(() => nock.cleanAll());

  describe('Create User', () => {
    it('POST `/` should return HTTP Status 400 if all API receives a malformed request', async () => {
      const res = await chai
        .request(server)
        .post('/v1/users/create')
        .send({ ...request, email: undefined })
        .redirects(0);

      expect(res).to.have.status(400);
      expect(res.body.message).to.contain('Invalid information');
    });

    it('POST `/` should return HTTP Status 201 if a new user is created via API request', async () => {
      const res = await chai
        .request(server)
        .post('/v1/users/create')
        .send(request)
        .redirects(0);

      expect(res).to.have.status(201);
      expect(res.body.message).to.contain(`New User ${request.name} was created with success!`);
    });
  });

  // describe('Find All Users', () => {
  //   it('GET `/` should return HTTP Status 200 with all user added in database', async () => {
  //     const res = await chai
  //       .request(server)
  //       .get('/v1/users')
  //       .redirects(0);

  //     expect(res).to.have.status(200);
  //     res.body.forEach(user => {
  //       expect(Boolean(user.name && user.password && user.email)).to.be(true);
  //     });
  //   });
  // });
});
