const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require('dotenv').config();

async function connectToMongoDB() {
    const mongoURL = process.env.MONGODB_URL;

    if (!mongoURL) {
        console.error("❌ MONGODB_URL not found in .env file");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURL);
        console.log("✅ MongoDB Atlas connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

module.exports = {
    connectToMongoDB,
};
