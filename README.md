# RestFUL-API_Recipe-Sharing

# Practice
 Recipe Sharing API
 
 **Group Member:**
 Jeleane Matining,
 Christel Lacerna,
 Kisha Mangubat,
 Mark Angelo Lazo

**Project Overview:**
This project is a Recipe Sharing API built using Node.js and Express.js. It provides endpoints for retrieving, adding, updating, and deleting recipes. The API allows users to access a collection of recipes categorized by meal types such as breakfast, lunch, dinner, dessert, and snack.

**Purpose:**
The purpose of this API is to facilitate the sharing and management of recipes. Users can perform various operations such as viewing all recipes, fetching recipes by category, adding new recipes, updating existing recipes, and deleting recipes.
 
**Features:**
1. Retrieve all recipes or sort them by name.
2. Fetch a recipe by specifying its category.
3. Add a new recipe to the collection.
4. Update an existing recipe by name.
5. Delete a recipe by specifying its category.

**Dependencies:**
Express: A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.
Joi: A powerful schema description language and data validator for JavaScript. It's used for validating the request payload in this project.

**API Endpoints:**
1. GET /api/recipes: Retrieves all recipes.
      Query Parameters:sortBy=name: Sorts recipes by name.
2. GET /api/recipes/:category: Fetches a recipe by category.
3. POST /api/recipes: Adds a new recipe.
4. PUT /api/recipes/:name: Updates a recipe by name.
5. DELETE /api/recipes/:category: Deletes a recipe by category.

**Example Usage:**
1. Retrieve all recipes: GET http://localhost:3000/api/recipes
2. Fetch a recipe by category (e.g., Lunch): GET http://localhost:3000/api/recipes/Lunch
3. Add a new recipe:POST http://localhost:3000/api/recipes
Request Body:
{
    "name": "New Recipe Name",
    "categories": "Category",
    "ingredients": ["Ingredient 1", "Ingredient 2"]
}

4. Update an existing recipe:
PUT http://localhost:3000/api/recipes/Existing%20Recipe%20Name
Request Body:
{
    "name": "Updated Recipe Name",
    "categories": "Category",
    "ingredients": ["Updated Ingredient 1", "Updated Ingredient 2"]
}

5. Delete a recipe by category (e.g., Dessert):
DELETE http://localhost:3000/api/recipes/Dessert
