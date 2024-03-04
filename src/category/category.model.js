const mongoose = require("mongoose");
const config = require("../configs/config");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: String,

    description: String,

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
categorySchema.index({ createdBy: 1 });
categorySchema.index({ updatedBy: 1 });
module.exports = mongoose.model(
  config.collections.categoryCollection,
  categorySchema
);
