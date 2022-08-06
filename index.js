const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
var cors = require("cors");
const fileUpload = require("express-fileupload");
const faceapiService = require("./faceapiService");

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
  const imageBuffer = fs.readFileSync("./fem.jpg");
  console.log(imageBuffer);
  const result = await faceapiService.detect(req.files?.files?.data);
  res.json({
    detectedFaces: result,
  });
  // res.json({});
});

app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`);
});
