const albumModel = require("./album.model");
const songModel = require("../song/song.model");
const statusCode = require("../errorCodes");

class ItemService {
  async getAlbums() {
    return await albumModel.find();
  }

  async addAlbum(albumObject) {
    return await new albumModel({
      name: albumObject.name,
      description: albumObject.description,
      showNbTracks: albumObject.showNbTracks,
    }).save();
  }

  //A check was added to notify the user if he provides a wrong albumId
  async getAlbumById(albumId) {
    const foundAlbum = await albumModel.findOne({ _id: albumId });
    if (!foundAlbum) {
      const error = new Error("Album not found");
      error.statusCode = statusCode.notFound;
      throw error;
    } else {
      return foundAlbum;
    }
  }

  async updateAlbum(albumId, albumObject) {
    await albumModel.updateOne({ _id: albumId }, { $set: albumObject });
  }

  //All songs added to the album to delete will be deleted
  async deleteAlbum(albumId) {
    await songModel.deleteMany({ albumId: albumId });
    await albumModel.deleteOne({ _id: albumId });
  }
}
module.exports = ItemService;
