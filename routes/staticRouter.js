const express = require("express");
const URL = require("../models/URL");  // Correct path to the model file

const router = express.Router();

router.get('/' , async(req , res) => {
    const allurls = await URL.find({});
    
    return res.render("home" , {
        urls: allurls , 
    });
})

module.exports = router ;