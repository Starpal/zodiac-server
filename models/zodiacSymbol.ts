import mongoose, { Schema, Document, Model } from "mongoose";

export interface IZodiacSymbol extends Document {
    sign?: string;
    degree?: number;
    title?: string;
    keynote?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const zodiacSymbolSchema = new Schema<IZodiacSymbol>(
    {
        sign: String,
        degree: { type: Number, min: 1, max: 30 },
        title: String,
        keynote: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const ZodiacSymbol: Model<IZodiacSymbol> = mongoose.model<IZodiacSymbol>(
    "ZodiacSymbol",
    zodiacSymbolSchema
);

export default ZodiacSymbol;
