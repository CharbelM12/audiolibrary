const categoryModel = require("./category.model");
const statusCode = require("../errorCodes");

class categoryService {
  //A check was added to prevent from saving an existing category
  async addCategory(categoryObject) {
    const foundCategoryName = await categoryModel.findOne({
      name: categoryObject.name,
    });
    if (foundCategoryName) {
      const error = new Error("The category already exists");
      error.statusCode = statusCode.conflict;
      throw error;
    } else {
      return await new categoryModel({
        name: categoryObject.name,
        description: categoryObject.description,
      }).save();
    }
  }
  //this function was called in the addSong function in the song service.
  //It was used to check if the user entered an existing categoryId
  async getCategoryById(categoryId) {
    const foundCategory = await categoryModel.findOne({
      _id: categoryId,
    });
    if (!foundCategory) {
      const error = new Error("No category found");
      error.statusCode = statusCode.notFound;
      throw error;
    } else {
      return foundCategory;
    }
  }
}
module.exports = categoryService;
