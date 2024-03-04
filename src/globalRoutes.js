const express = require("express");
const router = express.Router();
const userRoutes = require("./user/user.routes");
const categoryRoutes = require("./category/category.routes");
const songRoutes = require("./song/song.routes");
const albumRoutes = require("./album/album.routes");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/song", songRoutes);
router.use("/album", albumRoutes);

module.exports = router;
