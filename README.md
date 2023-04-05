# SaveMyFood
My Final Project for CB-WD-23


Save My Food!
This is a web application that allows users to search for and save recipes. The application utilizes a frontend built with React, 
and a backend built with Node.js and MongoDB.

Features

Users can search for recipes based on ingredients they have in their cupboards 
Users can save recipes to their account for later viewing
Users can filter search results based on dietary restrictions (gluten-free, dairy-free, vegan, vegetarian)
User authentication and authorization using Auth0// though it is a simple "Log IN/ Log OUT" function at the moment.
Everything revolves around the free Spoonacular API

Installation

Clone the repository to your local machine using git clone
Install the dependencies for both the client and server by running npm install in the /client and /server directories
Set up a MongoDB Atlas account and update the connection string in /server/handlers.js
Create a .env file in the /client directory with the following contents:

Create the file ".env"
Copy the Code below:

REACT_APP_AUTH0_DOMAIN=<your-auth0-domain>
REACT_APP_AUTH0_CLIENT_ID=<your-auth0-client-id>
REACT_APP_AUTH0_AUDIENCE=<your-auth0-audience>

Create a .env file in the /server directory with the following contents:
makefile
Copy code

MONGO_URI=<your-mongodb-atlas-uri>
API= <your-spoonacular-api-uri>

Start the client and server by running yarn start in the /client and /server directories respectively

Usage
After installing and starting the application, you can use the following features:

Search for Recipes
To search for recipes, enter an ingredient in the search bar and add it to the ingredients list. 
The results will be displayed on the left side of the main screen. 
Click on Search for Recipes! will then ping the API and gather 30 random recipes that have all the ingredients you have and if 
you didn't have enough ingredients, then it will add a recipe that you might be missing one ingredient for simplifying ideas for future meals.
You can also filter the search results based on dietary restrictions by clicking the corresponding buttons.
To unfilter, make sure all tabs are unclicked.

Save Recipes
To save a recipe, click the "Save" button on the recipe card. 
You can view your saved recipes by clicking the "Saved Recipes" link in the navigation bar.

Recipe Details
If you click on the images of the recipe you are interested in, a pop-up will appear from the left with instructions and the ingredients needed 
for the recipe. You can also click on the Blue Link Bar at the bottom of this pop-up to go into further details like calories,vitamins, price etc etc.
