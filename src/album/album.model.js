const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//the required option was added because there is no validation
const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    showNbTracks: {
      type: Boolean,
      required: true,
    },
    lastSongAddedAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Album", albumSchema);
