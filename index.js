const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(cors());

app.listen("3000");

app.get("/",(req,res)=>{
  res.status(200).send("Web Server is running. Status 200");
 
});
app.get("/mp4", async (req, res) => {
    const { url } = req.query;

    if (url) {
        const isValid = ytdl.validateURL(url);

        if (isValid) {
            const videoName = (await ytdl.getInfo(url)).videoDetails.title;

            res.header(
                "Content-Disposition",
                `attachment; filename="${videoName}.mp4"`
            );

            ytdl(url, {
                quality: "highest",
                format: "mp4",
            }).pipe(res);
        } else {
            res.status(400).send("Invalid url");
        }
    } else {
        res.status(400).send("Invalid query");
    }
});


