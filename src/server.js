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

    // Keep alive
    const serverUrl = process.env.API_URL;

    if (serverUrl) {
      setInterval(
        () => {
          fetch(serverUrl)
            .then((res) => console.log(`🏓 Pinged ${serverUrl}: ${res.status}`))
            .catch(console.error);
        },
        14 * 60 * 1000,
      );
    }
  } catch (error) {
    process.exit(1);
  }
}

start();
