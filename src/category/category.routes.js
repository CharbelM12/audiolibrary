const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");
const categoryController = new CategoryController();
const addressValidation = require("./category.validation");
const { validate } = require("express-validation");

router.post(
  "/",
  validate(addressValidation.addCategory),
  categoryController.addCategory
);

module.exports = router;
