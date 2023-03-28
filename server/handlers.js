"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const { API } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const test = async (req, res) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch${API}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const postUserIngredient = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalProject");
    const newOrder = req.body;
    const itemId = Number(req.body.itemId);
    const itemAmount = req.body.itemAmount;
    const id = uuidv4();
    newOrder._id = id;

    //     const itemMongo = await db.collection("userIngredients").findOne({ _id: itemId });
    //     const numInStock = itemMongo.numInStock;

    // if (!newOrder.name || !newOrder.price || !newOrder.category) {
    //       return res.status(404).json({
    //         status: 404,
    //         data: newOrder,
    //         message: "Failed to make a new order",
    //       });
    //     } else {
    //   await db
    //     .collection("items")
    //     .updateOne(
    //       { _id: itemId },
    //       { $set: { numInStock: numInStock - itemAmount } }
    //     );

    await db.collection("userIngredients").insertOne(newOrder);
    //   if (!numInStockValues[itemId]) {
    //     numInStockValues[itemId] = numInStock - itemAmount;
    //   } else {
    //     numInStockValues[itemId] -= itemAmount;
    //   }

    res.status(201).json({ status: 201, data: newOrder });

    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

module.exports = { test, postUserIngredient };
