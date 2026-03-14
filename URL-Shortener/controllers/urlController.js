const Url = require('../models/Url');
const shortid = require('shortid');
exports.createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
    try {
        let url = await Url.findOne({ longUrl });
        if (url) return res.json(url);
        const shortUrl = shortid.generate();
        url = new Url({ longUrl, shortUrl });
        await url.save();
        res.status(201).json(url);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.redirectUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortId });
        if (!url) return res.status(404).json({ message: 'URL not found' });
        url.clicks++;
        await url.save();
        res.redirect(url.longUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};