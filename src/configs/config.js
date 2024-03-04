require("dotenv").config();
module.exports = {
  mongodbConnectionString: process.env.DB_CONNECTION_STRING,

  port: process.env.PORT,

  corsHeaders: {
    allowedOrigin: "*",
    allowedMethods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  },

  collections: {
    categoryCollection: "Category",
    albumCollection: "Album",
    userCollection: "User",
  },

  timestampsValue: true,

  tokens: {
    accessTokenExpiry: "1h",
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
};
