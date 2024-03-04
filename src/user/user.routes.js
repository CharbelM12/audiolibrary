const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const userController = new UserController();
const userValidation = require("./user.validation");
const { validate } = require("express-validation");

router.post("/signup", validate(userValidation.signup), userController.signup);

router.post("/login", validate(userValidation.login), userController.login);

module.exports = router;
