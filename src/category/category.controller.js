const CategoryService = require("./category.service");
const categoryService = new CategoryService();
const HttpException = require("../exceptions/httpException");

class CategoryController {
  async addCategory(req, res, next) {
    try {
      await categoryService.addCategory(req.body, req.userId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
}
module.exports = CategoryController;
