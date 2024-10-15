const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");


const app = express();
const PORT = process.env.PORT || 3000;

const mainUrl = `https://reddit.com/r/memes`;

app.get("/memes", async (req, res) => {
    try {
        const response = await axios.get(mainUrl);
        const memes = extractMemes(response.data);
        res.json(memes); 
    } catch (error) {
        res.status(500).json({ error: "Error fetching memes" });
    }
});

const extractMemes = (html) => {
    const $ = cheerio.load(html);
    const memeImages = $("img.i18n-post-media-img");
    const memeUrls = [];
    memeImages.each((_, element) => {
        const memeUrl = $(element).attr("src");
        memeUrls.push(memeUrl);
    });
    return memeUrls;
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});