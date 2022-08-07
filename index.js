const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
var cors = require("cors");
const fileUpload = require("express-fileupload");
const faceapiService = require("./faceapiService");

var nude = require("nude");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    allowedHeaders: true,
  })
);

app.use(fileUpload());

app.post("/upload", async (req, res) => {
  console.log(req.files.files);
  // const imageBuffer = fs.readFileSync("./4.jpg");
  // console.log(imageBuffer);

  // nude.scan(__dirname + "/6.jpg", function (resp) {
  //   res.json(resp);
  // });

  const result = await faceapiService.detect(req.files?.files?.data);
  res.json({
    detectedFaces: result,
  });
  res.json({});
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
