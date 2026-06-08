import express from 'express';
import {handleGenerateURL, handleGetAnalytics}  from '../controllers/generateURL.js';

const router = express.Router();
router.post('/', handleGenerateURL);

router.get('/analytics/:shortId', handleGetAnalytics);

export default router;