const userModel = require("./user.model");
const statusCode = require("../configs/errorCodes.config");
const errorMessages = require("../errorMessages");
const moment = require("moment");
const { SHA256 } = require("crypto-js");
const generateAccessTokens = require("../utils/jwt.utils");

class userService {
  async signup(reqBody) {
    const user = await userModel.findOne({ email: reqBody.email });
    if (user) {
      const error = new Error(errorMessages.emailAlreadyExist);
      error.status = statusCode.conflict;
      throw error;
    }
    await new userModel({
      name: reqBody.name,
      email: reqBody.email,
      password: SHA256(reqBody.password).toString(),
      registrationDate: moment(),
      dateOfBirth: reqBody.dateOfBirth,
      location: {
        coordinates: reqBody.location.coordinates,
      },
    }).save();
  }
  async login(reqBody) {
    const user = await userModel.findOne({ email: reqBody.email });
    if (!user) {
      const error = new Error(errorMessages.incorrectCredentials);
      error.status = statusCode.notAuthenticated;
      throw error;
    } else if (user.password !== SHA256(reqBody.password).toString()) {
      const error = new Error(errorMessages.incorrectCredentials);
      error.status = statusCode.notAuthenticated;
      throw error;
    } else {
      const payload = {
        email: user.email,
        userId: user._id.toString(),
      };
      const accessToken = generateAccessTokens(payload);
      return accessToken;
    }
  }
}
module.exports = userService;
