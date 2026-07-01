import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUploadBgImage extends Document {
    filename: string;
    contentType: string;
    imageBase64: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const uploadBgImageSchema = new Schema<IUploadBgImage>(
    {
        filename: {
            type: String,
            unique: true,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
        imageBase64: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UploadBgImage: Model<IUploadBgImage> = mongoose.model<IUploadBgImage>(
    "UploadBgImage",
    uploadBgImageSchema
);

export default UploadBgImage;
