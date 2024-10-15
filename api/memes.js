const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
    const mainUrl = `https://reddit.com/r/memes`;

    try {
        const response = await axios.get(mainUrl);
        const memes = extractMemes(response.data);
        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching memes" });
    }
};

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
