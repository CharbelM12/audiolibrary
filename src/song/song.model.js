const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//the required option was added because there is no validation
const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  albumId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Album",
  },
});
module.exports = mongoose.model("Song", songSchema);
