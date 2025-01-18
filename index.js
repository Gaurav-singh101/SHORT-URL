const express = require("express");
const path = require('path');
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const URL = require('./models/url');

const app = express();
const PORT  = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log('Mongodb connected'));

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url" , urlRoute);
app.use("/" , staticRouter);

app.use('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortID: shortId }, // Use shortID (assuming that's the name in your schema)
            {
                $push: {
                    VisitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Redirect to the original URL
        res.redirect(entry.redirectURL);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT , () => console.log(`Server Started at PORT: ${PORT}`))