const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION);

        console.log(
            `✅ Connected to MongoDB: ${connection.connection.name}`
        );
    } catch (error) {
        console.error("❌ MongoDB connection failed");
        throw error;
    }
}

module.exports = connectDB;