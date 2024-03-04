const mongoose = require("mongoose");
const config = require("../configs/config");
const userConfig = require("./user.config");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,

    email: String,

    password: String,

    registrationDate: Date,

    dateOfBirth: Date,

    location: {
      type: {
        type: String,
        default: userConfig.geoLocation.point,
      },
      coordinates: [Number],
    },
  },
  { timestamps: config.timestampsValue }
);
userSchema.index({ email: 1 });
userSchema.index({ location: userConfig.geoLocation.index });
module.exports = mongoose.model(config.collections.userCollection, userSchema);
