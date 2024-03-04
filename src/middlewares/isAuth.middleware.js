const jwt = require("jsonwebtoken");
const errorMessages = require("../errorMessages");
const statusCodes = require("../configs/errorCodes.config");
const config = require("../configs/config");
const HttpException = require("../exceptions/httpException");

const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error(errorMessages.notAuthenticated);
    error.statusCode = statusCodes.notAuthenticated;
    next(new HttpException(error.statusCode, error.message));
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.tokens.accessTokenSecret);
  } catch (error) {
    error = new Error(errorMessages.notAuthenticated);
    error.statusCode = statusCodes.notAuthenticated;
    next(new HttpException(error.statusCode, error.message));
  }
  if (!decodedToken) {
    const error = new Error(errorMessages.notAuthenticated);
    error.statusCode = statusCodes.notAuthenticated;
    next(new HttpException(error.statusCode, error.message));
  } else {
    req.userId = decodedToken.userId;
    next();
  }
};
module.exports = isAuth;
