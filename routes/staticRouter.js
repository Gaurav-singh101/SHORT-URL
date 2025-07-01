const express = require("express");
const URL = require("../models/My_URL"); 
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    try {
        const allurls = await URL.find({}); // Fetch all URLs from the database
        console.log(allurls); // Debugging: log all URLs to the console

        return res.render("home", {
            urls: allurls, // Pass the URLs to the template
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).send("An error occurred while fetching URLs.");
    }
});

// Updated root route - shows signup first for unauthenticated users
router.get('/', async (req, res) => {
    // If user is not authenticated, redirect to signup
    if (!req.user) {
        return res.redirect('/signup');
    }
    
    // If user is authenticated, show their URLs
    const allurls = await URL.find({ createdBy: req.user._id }); 
    return res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;