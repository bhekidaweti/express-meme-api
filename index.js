const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const memesRouter = require("./api/memes");

const app = express();
const PORT = process.env.PORT || 3000;


app.use("/api", memesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
