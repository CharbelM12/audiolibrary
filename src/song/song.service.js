const songModel = require("./song.model");
const moment = require("moment");
const AlbumService = require("../album/album.service");
const albumService = new AlbumService();
const CategoryService = require("../category/category.service");
const categoryService = new CategoryService();

class SongService {
  //In this function the albumId will be passed as query parameter and the other song fields will be passed in the song object in the request body.
  async addSong(albumId, songObject) {
    //the getAlbumById function was called in this function to check if the user entered an existing album
    const foundAlbum = await albumService.getAlbumById(albumId);
    //the getCategoryById function was called in this function to check if the user entered an existing category
    await categoryService.getCategoryById(songObject.categoryId);
    const addedSong = await new songModel({
      name: songObject.name,
      singer: songObject.singer,
      categoryId: songObject.categoryId,
      albumId: albumId,
    }).save();
    //After adding the song the lastSongAddedAt field in the album will be updated to the same date the song will be added.
    //the updatedAt field will be automaticaly updated
    foundAlbum.lastSongAddedAt = moment();
    await foundAlbum.save();
    return addedSong;
  }

  async deleteSong(songId) {
    await songModel.deleteOne({ _id: songId });
  }
}
module.exports = SongService;
