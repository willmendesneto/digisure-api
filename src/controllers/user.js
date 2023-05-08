const { runValidation, schemas } = require('../schemas');
const { create, findAll } = require('../models/user');

const findAllUsers = async (req, res) => {
  try {
    const users = await findAll();

    return res.status(200).send(
      users.map(user => ({
        name: user.name,
        email: user.email,
      })),
    );
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const createUser = async (req, res) => {
  const data = {
    message: '',
  };
  let statusCode = 201;

  const validationResult = runValidation(req.body, schemas.USER_SCHEMA);

  if (!validationResult.valid) {
    statusCode = 400;
    data.message = `Invalid information: ${validationResult.error}`;
    req.log.error(data);
    return res.status(statusCode).send(data);
  }

  try {
    const success = await create(req.body);

    if (!success) {
      throw new Error("Houston, we're having some problems and your user was not created. Try again later");
    }
    return res.status(201).send({
      message: `New User ${req.body.name} was created with success!`,
    });
  } catch (error) {
    req.log.error({ error });
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { createUser, findAllUsers };
