const songModel = require("./song.model");
const moment = require("moment");
const statusCodes = require("../configs/errorCodes.config");
const errorMessages = require("../errorMessages");
const AlbumService = require("../album/album.service");
const albumService = new AlbumService();
const CategoryService = require("../category/category.service");
const categoryService = new CategoryService();

class SongService {
  //In this function the albumId will be passed as query parameter and the other song fields will be passed in the request body.
  async addSong(albumId, reqBody, userId) {
    //the getAlbumById function was called in this function to check if the user entered an existing album
    await albumService.getAlbumById(albumId);
    //the getCategoryById function was called in this function to check if the user entered an existing category
    await categoryService.getCategoryById(reqBody.categoryId);
    await new songModel({
      name: reqBody.name,
      singer: reqBody.singer,
      categoryId: reqBody.categoryId,
      albumId: albumId,
    }).save();
    //After adding the song the lastSongAddedAt and updatedBy fields in the album will be updated.
    await albumService.updateLastSongAddedAt(albumId, userId);
  }

  async deleteSong(songId) {
    await this.getSongById(songId);
    await songModel.deleteOne({ _id: songId });
  }
  //this function was used in the deleteSong function to check that the user entered a valid songId
  async getSongById(songId) {
    const song = await songModel.findOne({ _id: songId });
    if (!song) {
      const error = new Error(errorMessages.songNotFound);
      error.statusCode = statusCodes.notFound;
      throw error;
    } else {
      return song;
    }
  }

  async getSongsByAlbumId(albumId, categoryId) {
    const query = { albumId: albumId };
    if (categoryId) {
      query.categoryId = categoryId;
    }
    return await songModel.find(query).sort({ createdAt: 1 });
  }
  async deleteSongsRelatedToAlbum(albumId) {
    await albumService.getAlbumById(albumId);
    await songModel.deleteMany({ albumId: albumId });
  }
}
module.exports = SongService;
