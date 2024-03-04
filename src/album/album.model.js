const mongoose = require("mongoose");
const config = require("../configs/config");

const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    name: String,

    description: String,

    showNbTracks: {
      type: Boolean,
      default: false,
    },

    lastSongAddedAt: Date,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: config.collections.userCollection,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: config.collections.userCollection,
    },
  },
  { timestamps: config.timestampsValue }
);
albumSchema.index({ createdBy: 1 });
albumSchema.index({ updatedBy: 1 });
module.exports = mongoose.model(
  config.collections.albumCollection,
  albumSchema
);
