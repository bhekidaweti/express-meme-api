const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router(); 
const mainUrl = `https://reddit.com/r/memes`;

router.get("/memes", async (req, res) => {
    try {
        const response = await axios.get(mainUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0", 
            },
        });
        const memes = extractMemes(response.data);
        res.json(memes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching memes", details: error.message });
    }
});

const extractMemes = (html) => {
    const $ = cheerio.load(html);
    const memeImages = $("img.i18n-post-media-img");
    const memeUrls = [];
    memeImages.each((_, element) => {
        const memeUrl = $(element).attr("src");
        if (memeUrl) {
            memeUrls.push(memeUrl);
        }
    });
    return memeUrls;
};

module.exports = router; 