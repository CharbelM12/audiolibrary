const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//the required option was added because there is no validation
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
