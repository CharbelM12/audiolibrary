const UserService = require("./user.service");
const userService = new UserService();
const HttpException = require("../exceptions/httpException");

class UserController {
  async signup(req, res, next) {
    try {
      await userService.signup(req.body);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async login(req, res, next) {
    try {
      const token = await userService.login(req.body);
      res.send(token);
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
}

module.exports = UserController;
