const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require("./connect");
const URL = require("./models/URL");
const { restrictToLoggedinUserOnly  , checkAuth} = require("./middlewares/auth");


const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT  = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log('Mongodb connected'));

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use("/url" , restrictToLoggedinUserOnly  , urlRoute);
app.use("/" , checkAuth , staticRouter);
app.use("/user" , userRoute);

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