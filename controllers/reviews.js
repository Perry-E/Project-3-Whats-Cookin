const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews')

router.get('/', async(req, res) => {
  const reviews = await Reviews.find();
  res.json(reviews)
})

// Get all active reviews for recipe
router.get('/:recipeId', async(req, res) => {
  const reviews = await Reviews.find({
    recipe: req.params.recipeId,
    removed: {$exists: false}
  }).populate("user");
  
  res.json(reviews)
})


// Post user review
router.post('/:recipeId', async(req, res) => {
  req.body.recipe = req.params.recipeId;
  req.body.user = req.session.loggedUser?._id;
  
  const newReview = await Reviews.create(req.body)
  
  res.json(newReview)
})

// Update user review
router.put('/:reviewId', async(req, res) => {
  const updatedReview = await Reviews.findByIdAndUpdate(req.body.reviewId,
    {$set: req.body},
    {new: true}
  )

  res.json(updatedReview)
})

// Remove user review
router.delete('/:reviewId', async(req, res) => {
  await Reviews.findByIdAndUpdate(req.body.reviewId, {$set: {removed: true}})

  res.json("Review Removed")
})



module.exports = router;