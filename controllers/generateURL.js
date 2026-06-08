import URL from '../models/url.model.js';
import shortid from 'shortid';

async function handleGenerateURL (req, res) {
    const body = req.body;

    if (!body.originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    const shortId = shortid.generate(8);

    await URL.create({
        shortId: shortId,
        originalUrl: body.originalUrl,
        visitHistory: [],
        createdBy: req.user._id, // Assuming req.user is populated by authentication middleware
    })
    {/*res.json({ shortId: shortId }); */}
    return res.render('home', { id: shortId });
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;

    const result  = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

export { handleGenerateURL, handleGetAnalytics };