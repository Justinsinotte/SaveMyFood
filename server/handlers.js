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
    await client.close();
    return res.status(200).json({
      status: 200,
      data: cartItems,
      message: "Got Ingredients",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

const delUserIngredient = async (req, res) => {
  const ingId = Number(req.body.id);
  const client = new MongoClient(MONGO_URI, options);
  console.log(ingId);
  try {
    await client.connect();
    const db = client.db("finalProject");
    const ingItem = await db
      .collection("userIngredients")
      .findOne({ id: ingId });
    console.log(ingItem);

    if (ingItem === 0) {
      res.status(400).json({
        status: 400,
        data: ingItem,
        message: "Error: Ingredients not found.",
      });
    }
    if (!ingItem) {
      return res.status(404).json({
        status: 404,
        message: "Ingredient not found.",
      });
    } else {
      await db.collection("userIngredients").deleteOne({ id: ingItem.id });
      res.status(200).json({
        status: 200,
        message: "Deleted Ingredient",
      });
    }
    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

const delAllUserIngredients = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");

    await db.collection("userIngredients").deleteMany({});

    res.status(200).json({
      status: 200,
      message: "Deleted Ingredient",
    });

    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

const getIngredientsQuery = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("finalProject");
    await db.collection("userRecipes").deleteMany({}); // remove all documents from userRecipes collection

    const cartItems = await db.collection("userIngredients").find().toArray();
    const query = cartItems
      .map((item) => item.name.replace(/\s+/g, "+"))
      .join(",");
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=50&ranking=2&ignorePantry${API}`;
    // const url = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${query}&number=60&ignorePantry${API}`;
    const response = await fetch(url);
    const data = await response.json();
    await db.collection("userRecipes").deleteMany({});
    await db.collection("userRecipes").insertMany(data);

    await client.close();

    return res.status(200).json({
      status: 200,
      data: data,
      message: "Got Recipes!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

const getRecipesInfoQuery = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("finalProject");

    const cartItems = await db.collection("userRecipes").find().toArray();
    const query = cartItems.map((item) => item.id).join(",");

    const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${query}${API}`;
    console.log(url);
    const response = await fetch(url);

    const data = await response.json();
    await db.collection("bulkRecipes").deleteMany({});
    await db.collection("bulkRecipes").insertMany(data);

    await client.close();

    return res.status(200).json({
      status: 200,
      data: data,
      message: "Got Recipes!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

const getUserAllRecipes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    const cartItems = await db.collection("userRecipes").find().toArray();
    await client.close();
    return res.status(200).json({
      status: 200,
      data: cartItems,
      message: "Got Recipes",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

const getBulkRecipes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    const cartItems = await db.collection("bulkRecipes").find().toArray();
    await client.close();
    return res.status(200).json({
      status: 200,
      data: cartItems,
      message: "Got Recipes",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

const delAllRecipes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");

    await db.collection("userRecipes").deleteMany({});
    res.status(200).json({
      status: 200,
      message: "Deleted all Recipes",
    });

    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

const postRecipeToFav = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("finalProject");
    const newOrder = req.body;
    const itemId = Number(req.body.itemId);
    const itemAmount = req.body.itemAmount;
    const id = uuidv4();
    newOrder._id = id;

    await db.collection("favRecipes").insertOne(newOrder);
    res.status(201).json({ status: 201, data: newOrder });

    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

const getFaveRecipes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("finalProject");
    const cartItems = await db.collection("favRecipes").find().toArray();
    await client.close();
    return res.status(200).json({
      status: 200,
      data: cartItems,
      message: "Got Recipes",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server Error",
    });
    await client.close();
  }
};

const delFaveRecipes = async (req, res) => {
  const ingId = req.body._id;
  const client = new MongoClient(MONGO_URI, options);
  console.log(ingId);
  try {
    await client.connect();
    const db = client.db("finalProject");
    const ingItem = await db.collection("favRecipes").findOne({ _id: ingId });
    console.log(ingItem);

    if (ingItem === 0) {
      res.status(400).json({
        status: 400,
        data: ingItem,
        message: "Error: Recipe not found.",
      });
    }
    if (!ingItem) {
      return res.status(404).json({
        status: 404,
        message: "Recipe not found.",
      });
    } else {
      await db.collection("favRecipes").deleteOne({ _id: ingItem._id });
      res.status(200).json({
        status: 200,
        message: "Deleted Recipe",
      });
    }
    await client.close();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    await client.close();
  }
};

const getSingleRecipe = async (req, res) => {
  const id = new MongoClient(MONGO_URI, options);
  const _id = Number(req.params.itemId);
  console.log(_id);
  try {
    await id.connect();

    const db = id.db("finalProject");
    const singleItem = await db.collection("bulkRecipes").findOne({ id: _id });
    console.log(singleItem);
    res.status(200).json({ status: 200, _id, data: singleItem });

    await id.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      data: "Internal Server error",
    });
    await id.close();
  }
};

module.exports = {
  test,
  postUserIngredients,
  getUserIngredients,
  delUserIngredient,
  delAllUserIngredients,
  getIngredientsQuery,
  getUserAllRecipes,
  getRecipesInfoQuery,
  getBulkRecipes,
  postRecipeToFav,
  getFaveRecipes,
  delFaveRecipes,
  getSingleRecipe,
};
