const { nanoid } = require("nanoid");
const URL = require('../models/My_URL');

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;

        // Check if 'url' is provided in the request body
        if (!body.url) {
            return res.status(400).json({ error: 'url is required' });
        }

        // Generate a short ID using nanoid (8 characters)
        const shortid = nanoid(8);

        // Check if the generated shortid already exists in the database
        const existingUrl = await URL.findOne({ shortID: shortid });
        if (existingUrl) {
            return res.status(409).json({ error: 'Short ID already exists. Please try again.' });
        }

        // Save the URL to the database
        const newUrl = await URL.create({
            shortID: shortid,
            redirectURL: body.url,
            VisitHistory: [], 
            createdBy: req.user._id ,
        });

        // Respond with the generated short ID and the saved data
        return res.render("home", {
            id: shortid,
        });
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        // Search for the URL entry by shortId
        const result = await URL.findOne({ shortID: shortId });

        // Check if the result is found
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Return the total clicks and visit history
        return res.json({
            totalClick: result.VisitHistory.length,  // Assuming 'VisitHistory' is the correct field name
            analytics: result.VisitHistory,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics ,
};