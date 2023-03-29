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

const postUserIngredients = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalProject");
    const newOrder = req.body;
    const id = uuidv4();
    newOrder._id = id;

    await db.collection("userIngredients").insertOne(newOrder);
    res.status(201).json({ status: 201, data: newOrder });

    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

const getUserIngredients = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    const cartItems = await db.collection("userIngredients").find().toArray();
    if (cartItems.length === 0) {
      res.status(400).json({
        status: 400,
        data: cartItems,
        message: "Error: Ingredients not found.",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: cartItems,
        message: "Got Ingredients",
      });
    }

    await client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

module.exports = { test, postUserIngredients, getUserIngredients };
