const SongService = require("./song.service");
const songService = new SongService();
const HttpException = require("../exceptions/httpException");

class songController {
  async addSong(req, res, next) {
    try {
      await songService.addSong(req.query.albumId, req.body, req.userId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async deleteSong(req, res, next) {
    try {
      await songService.deleteSong(req.params.songId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async getSongsByAlbumId(req, res, next) {
    try {
      const songs = await songService.getSongsByAlbumId(
        req.query.albumId,
        req.query.categoryId
      );
      res.send(songs);
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async deleteSongsRelatedToAlbum(req, res, next) {
    try {
      await songService.deleteSongsRelatedToAlbum(req.query.albumId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
}
module.exports = songController;
