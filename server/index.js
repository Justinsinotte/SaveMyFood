"use strict";
const express = require("express");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const { MONGO_URI, API } = process.env;

const {
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
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .post("/api/userIngredients", postUserIngredients)
  .get("/api/userIngredients", getUserIngredients)
  .get("/api/ingredientsQuery", getIngredientsQuery)
  .get("/api/userRecipes", getUserAllRecipes)
  .get("/api/userRecipesIdQuery", getRecipesInfoQuery)
  .get("/api/userBulkRecipes", getBulkRecipes)
  .delete("/api/userIngredients", delUserIngredient)
  .delete("/api/allUserIngredients", delAllUserIngredients)

  .post("/api/favRecipes", postRecipeToFav)
  .get("/api/favRecipes", getFaveRecipes)
  .delete("/api/favRecipes", delFaveRecipes)

  .get("/api/userBulkRecipes/:itemId", getSingleRecipe)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
