require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server listening on ${PORT}`);
        });
    } catch (error) {
        process.exit(1);
    }
}

start();