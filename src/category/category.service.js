const categoryModel = require("./category.model");
const statusCodes = require("../configs/errorCodes.config");
const errorMessages = require("../errorMessages");

class categoryService {
  //A check was added to prevent from saving an existing category
  async addCategory(reqBody, userId) {
    const foundCategoryName = await categoryModel.findOne({
      name: reqBody.name,
    });
    if (foundCategoryName) {
      const error = new Error(errorMessages.categoryAlreadyExists);
      error.statusCode = statusCodes.conflict;
      throw error;
    } else {
      await new categoryModel({
        name: reqBody.name,
        description: reqBody.description,
        createdBy: userId,
      }).save();
    }
  }
  //this function was called in the addSong function in the song service.
  //It was used to check if the user entered an existing categoryId
  async getCategoryById(categoryId) {
    const category = await categoryModel.findOne({
      _id: categoryId,
    });
    if (!category) {
      const error = new Error(errorMessages.categoryNotFound);
      error.statusCode = statusCodes.notFound;
      throw error;
    } else {
      return category;
    }
  }
}
module.exports = categoryService;
