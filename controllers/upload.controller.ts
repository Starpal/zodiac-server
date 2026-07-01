import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import UploadBgImage from "../models/uploadBgImage";

interface UploadResult {
    msg: string;
}

export const uploads = async (
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<Response> => {
    try {
        const files = req.files as Express.Multer.File[] | undefined;

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

        const savedImages: UploadResult[] = await Promise.all(
            files.map(async (file, index) => {
                const finalImg = {
                    filename: file.originalname,
                    contentType: file.mimetype,
                    imageBase64: imgArray[index],
                };

                try {
                    const newUpload = new UploadBgImage(finalImg);
                    await newUpload.save();

                    return {
                        msg: `${file.originalname} uploaded successfully`,
                    };
                } catch (error: unknown) {
                    const err = error as { name?: string; code?: number; message?: string };

                    if (err.name === "MongoServerError" && err.code === 11000) {
                        throw new Error(`Duplicate file: ${file.originalname}`);
                    }

                    throw new Error(err.message || `Cannot upload ${file.originalname}`);
                }
            })
        );

        return res.json({
            success: true,
            results: savedImages,
        });
    } catch (err: unknown) {
        const error = err as Error;
        console.error("Upload error:", error.message);

        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
