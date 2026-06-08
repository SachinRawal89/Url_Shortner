// This file defines routes for rendering static pages like the home page and signup page. It uses Express.js to handle
// HTTP GET requests and interacts with the URL model to fetch data for rendering the home page.
import express from 'express';
import URL from '../models/url.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login'); // Redirect to login page for unauthenticated users
    }
    const allUrls = await URL.find({ createdBy: req.user._id }); // Fetch URLs created by the logged-in user
    return res.render('home', { urls: allUrls });
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.get('/login', (req, res) => {
    return res.render('login');
})

export default router;
