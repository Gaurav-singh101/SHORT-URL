const mongoose = require('mongoose');

const { nanoid } = require('nanoid');

const urlSchema = new mongoose.Schema({
    shortID: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    VisitHistory: { type: Array, default: [] },
    sortid: { type: String, required: true, default: () => nanoid() }, 
    createdBy :{
        type: mongoose.Schema.Types.ObjectId , 
        ref: "users" ,
    },
});

module.exports = mongoose.model('URL', urlSchema);