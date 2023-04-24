![SaveMyFoodExample](https://user-images.githubusercontent.com/117525270/234014605-cc98c350-a996-4327-9830-5cb5f1ed9b72.gif)

<h1>Save My Food!</h1>


My Final Project for CB-WD-23 (Concordia Bootcamp Web Development)

This is a web application that allows users to search for and save recipes based on the ingredients they have at home.
The application utilizes a frontend built with React, and a backend built with Node.js and MongoDB.

<h2>Features</h2>

Users can search for recipes based on ingredients they have in their homes
Users can save recipes to their account for later viewing
Users can filter search results based on dietary restrictions (gluten-free, dairy-free, vegan, vegetarian)
User authentication and authorization using Auth0// though it is a simple "Log IN/ Log OUT" function at the moment.
Everything revolves around the free Spoonacular API

<h2>Installation</h2>

Clone the repository to your local machine using git clone
Install the dependencies for both the client and server by running npm install in the /client and /server directories
Set up a MongoDB Atlas account and update the connection string in /server/handlers.js
Create a .env file in the /client directory with the following contents:

<h3>Copy the Code below:</h3>

REACT_APP_AUTH0_DOMAIN=<your-auth0-domain>
REACT_APP_AUTH0_CLIENT_ID=<your-auth0-client-id>
REACT_APP_AUTH0_AUDIENCE=<your-auth0-audience>

Create a .env file in the /server directory with the following contents:

<h3>Copy the Code below:</h3>

MONGO_URI=<your-mongodb-atlas-uri>
API= <your-spoonacular-api-uri>

Start the client and server by running yarn start in the /client and /server directories respectively

<h2>Usage</h2>
After installing and starting the application, you can use the following features:

<h3>Search for Recipes</h3>

To search for recipes, enter an ingredient in the search bar and add it to the ingredients list.
The results will be displayed on the left side of the main screen.
Click on Search for Recipes! will then ping the API and gather 30 random recipes that have all the ingredients you have and if
you didn't have enough ingredients, then it will add a recipe that you might be missing one ingredient for simplifying ideas for future meals.
You can also filter the search results based on dietary restrictions by clicking the corresponding buttons.
To unfilter, make sure all tabs are unclicked.

<h3>Save Recipes</h3>

To save a recipe, click the "Save" button on the recipe card.
You can view your saved recipes by clicking the "Saved Recipes" link in the navigation bar.

Recipe Details
If you click on the images of the recipe you are interested in, a pop-up will appear from the left with instructions and the ingredients needed
for the recipe. You can also click on the Blue Link Bar at the bottom of this pop-up to go into further details like calories,vitamins, price etc etc.
