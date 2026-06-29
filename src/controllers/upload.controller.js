const uploadBgImage = require("../models/uploadBgImage");
const fs = require("fs/promises");

exports.uploads = async (req, res, next) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({
                error: "Please choose files",
            });
        }

        
        const imgArray = await Promise.all(
            files.map(async (file) => {
                const img = await fs.readFile(file.path);
                return img.toString("base64");
            })
        );

        const savedImages = await Promise.all(
            files.map(async (file, index) => {
                const finalImg = {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    imageBase64: imgArray[index],
                };

                try {
                    const newUpload = new uploadBgImage(finalImg);
                    await newUpload.save();

                    return {
                        msg: `${file.originalname} uploaded successfully`,
                    };
                } catch (error) {
                    if (error.name === "MongoServerError" && error.code === 11000) {
                        throw new Error(
                            `Duplicate file: ${file.originalname}`
                        );
                    }

                    throw new Error(
                        error.message ||
                            `Cannot upload ${file.originalname}`
                    );
                }
            })
        );

        return res.json({
            success: true,
            results: savedImages,
        });
    } catch (err) {
        console.error("Upload error:", err.message);

        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};