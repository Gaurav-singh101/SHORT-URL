const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
}, { timestamps: true });

// Check if model already exists before creating it
const User = mongoose.models.User || mongoose.model("users", userSchema);

module.exports = User;