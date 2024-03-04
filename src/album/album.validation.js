const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);

const addBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  showNbTracks: Joi.boolean().optional(),
};
const updateBody = {
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  showNbTracks: Joi.boolean().optional(),
};
const albumParams = {
  albumId: Joi.objectID().required(),
};

const albumValidation = {
  addAlbum: {
    body: Joi.object(addBody),
  },
  updateAlbum: {
    body: Joi.object(updateBody),
    params: Joi.object(albumParams),
  },
  getOrDeleteAlbum: {
    params: Joi.object(albumParams),
  },
};

module.exports = albumValidation;
