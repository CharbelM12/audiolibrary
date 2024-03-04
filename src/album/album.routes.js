const express = require("express");
const router = express.Router();
const AlbumController = require("./album.controller");
const albumController = new AlbumController();
const albumValidation = require("./album.validation");
const { validate } = require("express-validation");

router.get("/", albumController.getAlbums);

router.post("/", validate(albumValidation.addAlbum), albumController.addAlbum);

router.get(
  "/:albumId",
  validate(albumValidation.getOrDeleteAlbum),
  albumController.getAlbumById
);

router.put(
  "/:albumId",
  validate(albumValidation.updateAlbum),
  albumController.updateAlbum
);

router.delete(
  "/:albumId",
  validate(albumValidation.getOrDeleteAlbum),
  albumController.deleteAlbum
);

module.exports = router;
