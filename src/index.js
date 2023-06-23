const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

//
// Registers a HTTP GET route for video streaming.
//

app.get('/', (req, res) => {
    res.send(
      "<h1><a href=`http://${hostname}:3000/video1` target='_blank'>create a S3 bucket with terraform </a><br><a href=`http://${hostname}:3000/video2' target='_blank'>Installing AWS EBCLI in centos </a></h1>"
    );
})
app.get("/video1", (req, res) => {

    const videoPath = path.join("./videos", "terraform-basics-s3.mp4");
    fs.stat(videoPath, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(videoPath).pipe(res);
    });
});

app.get("/video2", (req, res) => {
  const videoPath = path.join("./videos", "AWSEBCLIcentos.mp4");
  fs.stat(videoPath, (err, stats) => {
    if (err) {
      console.error("An error occurred ");
      res.sendStatus(500);
      return;
    }

    res.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
  });
});

//
// Starts the HTTP server.
//
app.listen(port, () => {
    console.log(`Microservice listening on port ${port}`);
});
