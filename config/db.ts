import mongoose from "mongoose";

async function connectDB(): Promise<void> {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_CONNECTION as string
        );

        console.log(`✅ Connected to MongoDB: ${connection.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        throw error;
    }
}

export default connectDB;
