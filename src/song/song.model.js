const mongoose = require("mongoose");
const config = require("../configs/config");
const songConfig = require("./song.config");

const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    name: String,

    singer: String,

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: config.collections.categoryCollection,
    },

    albumId: {
      type: Schema.Types.ObjectId,
      ref: config.collections.albumCollection,
    },
  },
  { timestamps: config.timestampsValue }
);
songSchema.index({ categoryId: 1 });
songSchema.index({ albumId: 1 });

module.exports = mongoose.model(
  songConfig.collections.songCollection,
  songSchema
);
