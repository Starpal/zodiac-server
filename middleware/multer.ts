import multer, { StorageEngine } from "multer";
import path from "path";
import type { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
    destination: function (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) {
        cb(null, "uploads");
    },
    filename: function (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) {
        const ext = path.extname(file.originalname);
        const name = `${file.fieldname}-${Date.now()}${ext}`;

        cb(null, name);
    },
});

const upload = multer({ storage });

export default upload;
