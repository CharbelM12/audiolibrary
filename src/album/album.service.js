const albumModel = require("./album.model");
const songModel = require("../song/song.model");
const statusCodes = require("../configs/errorCodes.config");
const errorMessages = require("../errorMessages");
const moment = require("moment");

class albumService {
  async getAlbums() {
    return await albumModel.find();
  }

  async addAlbum(reqBody, userId) {
    await new albumModel({
      name: reqBody.name,
      description: reqBody.description,
      showNbTracks: reqBody.showNbTracks,
      createdBy: userId,
    }).save();
  }

  //A check was added to notify the user if he provides a wrong albumId
  async getAlbumById(albumId) {
    const album = await albumModel.findOne({ _id: albumId });
    if (!album) {
      const error = new Error(errorMessages.albumNotFound);
      error.statusCode = statusCodes.notFound;
      throw error;
    } else {
      return album;
    }
  }
  //the getAlbumById function was used to check that the user entered a valid albumId
  async updateAlbum(albumId, reqBody, userId) {
    await this.getAlbumById(albumId);
    await albumModel.updateOne(
      { _id: albumId },
      { $set: reqBody, updatedBy: userId }
    );
  }
  //the getAlbumById function was used to check that the user entered a valid albumId
  async deleteAlbum(albumId) {
    await this.getAlbumById(albumId);
    const relatedSong = await songModel.findOne({ albumId: albumId });
    if (relatedSong) {
      const error = new Error(errorMessages.cannotDeleteAlbum);
      error.statusCode = statusCodes.conflict;
      throw error;
    } else {
      await albumModel.deleteOne({ _id: albumId });
    }
  }
  //this function was used in the addSong function in the song service
  async updateLastSongAddedAt(albumId, userId) {
    await albumModel.updateOne(
      { _id: albumId },
      { $set: { lastSongAddedAt: moment(), updatedBy: userId } }
    );
  }
}
module.exports = albumService;
