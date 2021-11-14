const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
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
    const database = client.db("babs");
    const productsCollection = database.collection("products");
    const reviewsCollection = database.collection("reviews");
    const usersCollection = database.collection("users");

    // Get single service
    app.get("/products/:id", async (req, res) => {
      console.log("hits single record");
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };

      const product = await productsCollection.findOne(query);
      res.send(product);
    });

    //Get api show all data
    app.get("/reviews", async (req, res) => {
      const cursor = reviewsCollection.find({});
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    //Get api show all data
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    });

    //post Api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      console.log(result);
      res.json(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening at:${port}`);
});
