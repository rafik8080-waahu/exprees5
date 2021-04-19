const Joi = require("joi");

const validateAdduser = (body) => {
  const schema = new Joi.object({
    name: Joi.string().required().min(6).max(255),
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(6),
  });

  return schema.validate(body);
};
//validation for login
const validateUserLogin = (body) => {
  const schema = new Joi.object({
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(6),
  });

  return schema.validate(body);
};

module.exports = { validateAdduser, validateUserLogin };
