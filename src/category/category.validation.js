const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);

const addBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
};

const categoryValidation = {
  addCategory: {
    body: Joi.object(addBody),
  },
};

module.exports = categoryValidation;
