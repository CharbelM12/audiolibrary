const config = require("../configs/config");
const jwt = require("jsonwebtoken");

const generateAccessTokens = (payload) => {
  const accessToken = jwt.sign(payload, config.tokens.accessTokenSecret, {
    expiresIn: config.tokens.accessTokenExpiry,
  });
  return accessToken;
};
module.exports = generateAccessTokens;
