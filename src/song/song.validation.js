const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);
const addBody = {
  name: Joi.string().required(),
  singer: Joi.string().required(),
  categoryId: Joi.objectID().required(),
};
const songIdParams = {
  songId: Joi.objectID().required(),
};
const albumIdQuery = {
  albumId: Joi.objectID().required(),
};
const getSongsByAlbumIdQuery = {
  albumId: Joi.objectID().required(),
  categoryId: Joi.objectID().required(),
};
const songValidation = {
  addSong: {
    body: Joi.object(addBody),
    query: Joi.object(albumIdQuery),
  },
  deleteSong: {
    params: Joi.object(songIdParams),
  },
  getSongsByAlbumId: {
    query: Joi.object(getSongsByAlbumIdQuery),
  },
  deleteSongsRelatedToAlbum: {
    query: Joi.object(albumIdQuery),
  },
};

module.exports = songValidation;
