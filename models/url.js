const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    VisitHistory: [{
        timestamp: { type: Number }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });

// Check if model already exists before creating it
const URL = mongoose.models.URL || mongoose.model("URL", urlSchema);

module.exports = URL;