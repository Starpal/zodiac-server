import express, { Request, Response } from "express";
import upload from "../middleware/multer";
import UploadBgImage from "../models/uploadBgImage";

const router = express.Router();

// POST multiple images (one time on DB init)
router.post(
    "/uploadmultiple",
    upload.array("images", 12),
    async (req: Request, res: Response) => {
        try {
            const files = req.files as Express.Multer.File[] | undefined;

            if (!files || files.length === 0) {
                return res.status(400).json({ error: "No files uploaded" });
            }

            const savedFiles = files.map((file) => ({
                filename: file.filename,
                contentType: file.mimetype,
                imageBase64: null,
            }));

            // save in DB
            const result = await UploadBgImage.insertMany(savedFiles);

            return res.json({
                message: "Upload successful",
                count: result.length,
                files: result,
            });
        } catch (error) {
            console.error("Upload error:", error);
            return res.status(500).json({ error: "Upload failed" });
        }
    }
);

// GET random background image
router.get("/uploads", async (_req: Request, res: Response) => {
    try {
        const image = await UploadBgImage.aggregate([{ $sample: { size: 1 } }]);

        if (!image.length) {
            return res.status(404).json({ error: "No images found" });
        }

        return res.json(image[0]);
    } catch (error) {
        console.error("DB error:", error);
        return res.status(500).json({ error: "Failed to fetch image" });
    }
});

export default router;
