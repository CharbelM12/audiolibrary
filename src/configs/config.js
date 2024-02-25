require("dotenv").config();
module.exports = {
  mongodbConnectionString: process.env.DB_CONNECTION_STRING,
};
