const mongoose = require("mongoose");
const config = require("./src/configs/config");
const connect = async () => {
  try {
    await mongoose.connect(config.mongodbConnectionString);
  } catch (error) {
    throw error;
  }
};
module.exports = connect;
