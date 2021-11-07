const express = require('express');
const router = express.Router();
const MealPlan = require('../models/mealPlan');
const Recipe = require('../models/recipes');


// Test function - get all uploaded mealPlan
router.get('/', async (req, res) => {
  const mealPlans = await MealPlan.find({removed: {$exists: false}}).populate('recipe');
  res.json(mealPlans)
})

// Get meal plans based on user id
router.get('/userPlans/:userId', async (req, res) => {
  const mealPlans = await MealPlan.find({
    user: req.params.userId,
    removed: {$exists: false}
  }).populate('recipe');

  res.json(mealPlans)
})


// Get specific meal plan 
router.get('/:id', async (req, res) => {
  const mealPlan = await MealPlan.findById(req.params.id).populate('recipe');
  res.json(mealPlan)
})

// Create meal plan 
router.post('/:id', async (req, res) => {
  const {params: {id}, session} = req;

  // Get recipe info
  const mealPlan  = await Recipe.findById(req.params.id);
  
  // Create shopping list based on recipe ingredients
  const shoppingList = await mealPlan.ingredients.map((ingredient) => {
    const {amount, unit, name} = ingredient;
    return {amount, unit, name, got: false}
  })
  
  const payload = {
    user: session.loggedUser._id,
    recipe: id,
    shoppingList
  }

  MealPlan.create(payload, (err, mealPlan) => {
    if (err) { console.log(err) }
    res.json(mealPlan)
  })
})


// Increase current step by 1
router.put('/:id/updateStep', async (req, res) => {
  try {
    console.log(req.query)
    const mealPlan = await MealPlan.findById(req.params.id);

    mealPlan.currentStep = Number(req.query.value);
    await mealPlan.save()

    console.log(mealPlan)

    res.status(200).json(mealPlan);
  } catch (err) {
    console.log(err)
  }
})

// Toggle shopping list item
router.put('/:id/:itemId/:value', async (req, res) => {
  const {id, itemId, value} = req.params;

  MealPlan.findOneAndUpdate(
    {_id: id, "shoppingList._id": itemId},
    {$set: { 'shoppingList.$.got': value }},
    {new: true},
    (err, updatedPlan) => {
      if (err) {console.log(err)}
      res.json(updatedPlan)
    }
   )
})

// Set meal plan as removed
router.delete('/:id', async (req, res) => {
  MealPlan.findByIdAndUpdate(
    req.params.id,
    {$set: {removed: true}},
    {new: true},
    (err, deletedData) => {
      console.log(err);
      res.json(deletedData)
    })
})

module.exports = router;