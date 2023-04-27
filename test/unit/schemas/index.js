const { schemas, runValidation } = require('../../../src/schemas');

describe('Schemas', () => {
  describe('USER_SCHEMA', () => {
    const message = {
      email: 'anothertest@inexistentdomain.com',
      name: 'Some Name',
      password: 'Some Password',
    };

    it('validation should pass for valid object shapes', () => {
      const validationResult = runValidation(message, schemas.USER_SCHEMA);
      expect(validationResult.valid).to.eql(true);
      expect(validationResult.error === '').to.eql(true);
    });

    it('validation should fail for invalid object shapes', () => {
      const malformedMessage = { ...message, name: undefined };
      const validationResult = runValidation(malformedMessage, schemas.USER_SCHEMA);
      expect(validationResult.valid).to.eql(false);
      expect(validationResult.error === '').to.eql(false);
    });
  });
});
