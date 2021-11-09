const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { MongoClient, MongoRuntimeError } = require("mongodb");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello Babs baby-shop server");
});

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ybdl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("database is connected");
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening at:${port}`);
});
