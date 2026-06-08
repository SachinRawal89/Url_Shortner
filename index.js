import express from 'express';
import connectDB from './mongoDBConnection/connect.js';
import URL from './models/url.model.js';
import USER from './models/user.model.js';
import {restrictToLoggedInUsersOnly, checkAuth} from './middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';

import urlRouter from './routes/url.route.js';
import staticRouter from './routes/static.route.js';
import userRouter from './routes/user.route.js';


const MONGO_URL = 'mongodb://localhost:27017/short_url_db';

const app = express();
const PORT = 4000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

await connectDB(MONGO_URL)
.then(() => {
    console.log('Database connection successful');
})
.catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//gpt
app.use(express.static(path.resolve('./public')));

app.use('/url', restrictToLoggedInUsersOnly, urlRouter);
app.use('/user', userRouter);
app.use('/', checkAuth, staticRouter);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const urlEntry = await URL.findOneAndUpdate(
        { shortId },
        { 
            $push: { 
                visitHistory: { 
                    timestamps: Date.now(),
                } 
            } 
        },
        { new: true }
    );

    if (!urlEntry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(urlEntry.originalUrl);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});