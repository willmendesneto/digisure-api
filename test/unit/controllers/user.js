const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();

const res = { status: sandbox.stub() };
const logger = { error: sandbox.stub() };

const sendResponse = sandbox.stub();
const userModel = {
  create: sandbox.stub(),
  findAll: sandbox.stub(),
};

const { createUser } = proxyquire('../../../src/controllers/user', {
  '../models/user': () => userModel,
});

describe('Controllers: Send', () => {
  const req = { log: logger };
  const requestBody = {
    email: 'anothertest@inexistentdomain.com',
    name: 'Some Name',
    password: 'This is a password',
  };

  beforeEach(() => {
    res.status.returns({ send: sendResponse });
  });

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('When the request body is invalid', () => {
    beforeEach(async () => {
      const request = { ...req, body: {} };
      await createUser(request, res);
    });

    it('should return HTTP Status 400', async () => {
      expect(res.status).to.have.been.calledWith(400);
    });

    it('should return a message with `Invalid information:` prefix', async () => {
      const { message } = sendResponse.firstCall.args[0];
      expect(message).to.contain('Invalid information:');
    });
  });

  describe('When the user creation operation fails', () => {
    beforeEach(async () => {
      const request = {
        ...req,
        body: requestBody,
      };
      userModel.create.resolves(false);
      await createUser(request, res);
    });

    it('should return the error message for HTTP Status 500', async () => {
      const { message } = sendResponse.firstCall.args[0];
      expect(message).to.eql("Houston, we're having some problems and your user was not created. Try again later");
    });
  });

  describe('When the user is created with success', () => {
    beforeEach(async () => {
      const request = {
        ...req,
        body: requestBody,
      };
      userModel.create.resolves(true);
      await createUser(request, res);
    });

    it('should return HTTP Status 201', async () => {
      expect(res.status).to.have.been.calledWith(201);
    });

    it('should return the success message', async () => {
      const { message } = sendResponse.firstCall.args[0];
      expect(message).to.eql(`New User ${requestBody.name} was created with success!`);
    });
  });
});
