const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadBgImageSchema = new Schema(
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

const UploadBgImage = mongoose.model(
    "UploadBgImage",
    uploadBgImageSchema
);

module.exports = UploadBgImage;