const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello Babs baby-shop server");
});

app.use(cors());

app.listen(port, () => {
  console.log(`Listening at:${port}`);
});
