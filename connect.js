const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require('dotenv').config();

async function connectToMongoDB() {
    const mongoURL = process.env.MONGODB_URL;
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Atlas connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
}

module.exports = {
    connectToMongoDB,
};
