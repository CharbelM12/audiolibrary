const express = require("express");
const router = express.Router();
const SongController = require("./song.controller");
const songController = new SongController();
const songValidation = require("./song.validation");
const { validate } = require("express-validation");
const isAuth = require("../middlewares/isAuth.middleware");

router.post("/", validate(songValidation.addSong), songController.addSong);

router.get(
  "/",
  isAuth,
  validate(songValidation.getSongsByAlbumId),
  songController.getSongsByAlbumId
);

router.delete(
  "/byalbum",
  validate(songValidation.deleteSongsRelatedToAlbum),
  songController.deleteSongsRelatedToAlbum
);

router.delete(
  "/:songId",
  validate(songValidation.deleteSong),
  songController.deleteSong
);
module.exports = router;
