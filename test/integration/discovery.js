const chai = require('chai');
const app = require('../../src/app');

describe('Integration: Discovery endpoint', () => {
  let server;

  before(() => {
    server = app.listen();
  });

  after(() => server.close());

  it('GET `/` should return all available endpoints', async () => {
    const expectedResponse = {
      discovery: { url: 'http://127.0.0.1:3001/v1', method: 'GET' },
      users: {
        create: { url: 'http://127.0.0.1:3001/v1/users/create', method: 'POST' },
        list: { url: 'http://127.0.0.1:3001/v1/users', method: 'GET' },
      },
    };

    const res = await chai
      .request(server)
      .get('/v1/')
      .redirects(0);

    expect(res).to.have.status(200);
    expect(res.body).to.eql(expectedResponse);
  });
});
