const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);
const userConfig = require("./user.config");

const signupBody = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  location: Joi.object({
    coordinates: Joi.array()
      .length(userConfig.geoLocation.coordinatesLength)
      .items(
        Joi.number()
          .min(userConfig.geoLocation.longitude.minValue)
          .max(userConfig.geoLocation.longitude.maxValue)
          .required(),
        Joi.number()
          .min(userConfig.geoLocation.latitude.minValue)
          .max(userConfig.geoLocation.latitude.maxValue)
          .required()
      ),
  }).required(),
};
const loginBody = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};
const userValidation = {
  signup: {
    body: Joi.object(signupBody),
  },
  login: {
    body: Joi.object(loginBody),
  },
};

module.exports = userValidation;
