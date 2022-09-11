const Joi = require("joi");

module.exports = {
  createUser: (data) => {
    const schema = Joi.object().keys({
      firstName: Joi.string().trim().min(1).required(),
      lastName: Joi.string().trim().min(1).required(),
      email: Joi.string()
        .lowercase()
        .trim()
        .min(1)
        .required()
        .email({ minDomainSegments: 2 }),
      password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(data);
  },
  loginUser: (data) => {
    const schema = Joi.object().keys({
      email: Joi.string()
        .lowercase()
        .trim()
        .min(1)
        .required()
        .email({ minDomainSegments: 2 }),
      password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(data);
  },
};
