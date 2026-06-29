const express = require("express");
const router = express.Router();

const zodiacRoutes = require("./zodiac.routes");
const uploadRoutes = require("./upload.routes");

// mount delle feature
router.use("/zodiac", zodiacRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;