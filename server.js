const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const Joi = require('joi');

app.use(express.json());
app.listen(PORT, () => 
    console.log(`Listening on http://localhost:${PORT}...`)
);
// Sample data for recipes
const recipes = [
    {
        categories: "Breakfast",
        name: "Fluffy Pancakes",
        ingredients: ["1 cup all-purpose flour", "2 tablespoons sugar", "1 tablespoon baking powder", "1/2 teaspoon salt", "1 cup milk", "2 tablespoons unsalted butter, melted", "1 large egg", "1 teaspoon vanilla extract"]
    },
    {
        categories: "Lunch",
        name: "Chicken Caesar Salad",
        ingredients: ["2 boneless, skinless chicken breasts", "1 head romaine lettuce, chopped", "1/4 cup grated Parmesan cheese", "1/2 cup Caesar dressing", "1 cup croutons", "Salt and pepper to taste"]
    },
    {
        categories: "Dinner",
        name: "Spaghetti Bolognese",
        ingredients: ["8 oz spaghetti", "1 lb ground beef", "1 onion, diced", "2 cloves garlic, minced", "1 can (14 oz) crushed tomatoes", "1/2 cup beef broth", "1 teaspoon dried oregano", "Salt and pepper to taste"]
    },
    {
        categories: "Dessert",
        name: "Chocolate Chip Cookies",
        ingredients: ["2 1/4 cups all-purpose flour", "1/2 teaspoon baking soda", "1 cup unsalted butter, room temperature", "1/2 cup granulated sugar", "1 cup packed brown sugar", "1 teaspoon vanilla extract", "2 large eggs", "2 cups semisweet chocolate chips"]
    },
    {
        categories: "Snack",
        name: "Greek Yogurt Parfait",
        ingredients: ["1 cup Greek yogurt","1/2 cup granola","1/2 cup mixed berries (strawberries, blueberries, raspberries)","1 tablespoon honey or maple syrup","Optional toppings: sliced almonds, shredded coconut"
        ]
      }
];

// GET route to fetch all recipes
app.get('/api/recipes', (req, res) => {
    // Sort recipes by name if requested
    if (req.query.sortBy === 'name') {
        recipes.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Return the list of recipes
    res.json(recipes);
});


// GET route to fetch a single recipe by categories
app.get('/api/recipes/:category', (req, res) => {
    const recipe = recipes.find((r) => r.categories === req.params.category);
    if (!recipe)
        return res.status(404).send('The recipe with the given category was not found.');
    res.json(recipe);
});

// POST route to add a new recipe
app.post('/api/recipes', (req, res) => {
    // Simple validation using Joi
    const schema = Joi.object({
        name: Joi.string().required(),
        categories: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const { name, ingredients, categories } = req.body;
    const newRecipe = {
        categories,
        name,
        ingredients,
    };
    recipes.push(newRecipe);
    res.json(newRecipe);
});

// PUT route to update a recipe by name
app.put('/api/recipes/:name', (req, res) => {
    const recipeIndex = recipes.findIndex((r) => r.name === req.params.name);
    if (recipeIndex === -1) {
        return res.status(404).send('The recipe with the given name was not found.');
    }

    const schema = Joi.object({
        name: Joi.string().required(),
        categories: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    const { name, ingredients, categories } = req.body;
    recipes[recipeIndex].name = name;
    recipes[recipeIndex].ingredients = ingredients;
    recipes[recipeIndex].categories = categories;
    res.json(recipes[recipeIndex]);
});

// DELETE route to delete a recipe by category
app.delete('/api/recipes/:category', (req, res) => {
    const recipeIndex = recipes.findIndex((r) => r.categories === req.params.category);
    
    if (recipeIndex === -1) {
        return res.status(404).send('The recipe with the given category was not found.');
    }

    // Remove the recipe from the array
    const deletedRecipe = recipes.splice(recipeIndex, 1)[0];
    
    // Return the deleted recipe data
    res.json(deletedRecipe);
});
