const Joi = require('joi');

const runValidation = (obj, joiSchema) => {
  const { error } = Joi.validate(obj, joiSchema);
  return { valid: error === null, error: error === null ? '' : error.message };
};

const USER_SCHEMA = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  schemas: {
    USER_SCHEMA,
  },
  runValidation,
};
