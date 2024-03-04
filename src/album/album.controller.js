const AlbumService = require("./album.service");
const albumService = new AlbumService();
const HttpException = require("../exceptions/httpException");

class AlbumController {
  async getAlbums(req, res, next) {
    try {
      const albums = await albumService.getAlbums();
      res.send(albums);
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async addAlbum(req, res, next) {
    try {
      await albumService.addAlbum(req.body, req.userId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async getAlbumById(req, res, next) {
    try {
      const album = await albumService.getAlbumById(req.params.albumId);
      res.send(album);
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async updateAlbum(req, res, next) {
    try {
      await albumService.updateAlbum(req.params.albumId, req.body, req.userId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
  async deleteAlbum(req, res, next) {
    try {
      await albumService.deleteAlbum(req.params.albumId);
      res.end();
    } catch (error) {
      next(new HttpException(error.statusCode, error.message));
    }
  }
}
module.exports = AlbumController;
