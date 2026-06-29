const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const UploadBgImage = require("../models/uploadBgImage");

// POST multiple images (one time on DB init)
router.post("/uploadmultiple", upload.array("images", 12), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const savedFiles = req.files.map((file) => ({
      filename: file.filename,
      contentType: file.mimetype,
      imageBase64: null,
    }));

    // save in DB
    const result = await UploadBgImage.insertMany(savedFiles);

    res.json({
      message: "Upload successful",
      count: result.length,
      files: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// GET random background image
router.get("/uploads", async (req, res) => {
  try {
    console.log(
      "Random image fetched:",
      UploadBgImage.aggregate([{ $sample: { size: 1 } }]),
    );
    const image = await UploadBgImage.aggregate([{ $sample: { size: 1 } }]);
    if (!image.length) {
      return res.status(404).json({ error: "No images found" });
    }

    res.json(image[0]);
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

module.exports = router;
