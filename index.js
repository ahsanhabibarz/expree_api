const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
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
app.get("/", (req, res) => {
  if (req.cookies["site_jwt"]) {
    res.status(200).json({
      name: "habib",
    });
  } else {
    res.status(400).json({});
  }
});
app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`);
});
