const express = require("express");
const router = express.Router();

const cloudinary = require("../util/cloudinary");
const upload = require("../util/multer");

const Recipe = require("../models/recipes");
const seedRecipe = require('../models/seeds/recipes')


router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
});

router.get("/user/:userId", async (req, res) => {
  const recipies = await Recipe.find({owner: req.params.userId});
  res.status(200).json(recipies);
});

router.get("/seed", upload.single("picture"), async (req, res) => {
  try {
    const createdRecipes = await Recipe.create(seedRecipe);

    res.status(200).json(createdRecipes);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recipies = await Recipe.findById(id);
  res.status(200).json(recipies);
});

router.post("/new", upload.single("picture"), async (req, res) => {
  try {
    const payload = req.body
    payload.steps = JSON.parse(req.body.steps)
    payload.ingredients = JSON.parse(req.body.ingredients)
    payload.time = JSON.parse(req.body.time)
    payload.tags = JSON.parse(req.body.tags)

    // Upload image to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      payload.picture = { url: result.secure_url, cloudinary_id: result.public_id, };
    }

    const createdRecipe = await Recipe.create(payload);

    res.status(200).json(createdRecipe);
  } catch (err) {
    console.log(err);
  }
});



router.put("/:id/edit", upload.single("picture"),  async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
    
    payload = req.body
    payload.steps = JSON.parse(req.body.steps)
    payload.ingredients = JSON.parse(req.body.ingredients)
    payload.time = JSON.parse(req.body.time)
    payload.tags = JSON.parse(req.body.tags)
    
    // Upload image to cloudinary
    if (req.file) {
      // IF there is a photo, remove it
      if (recipe.picture.cloudinary_id) {
        await cloudinary.uploader.destroy(recipe.picture.cloudinary_id);
      }
      
      const result = await cloudinary.uploader.upload(req.file.path);
      payload.picture = { url: result.secure_url, cloudinary_id: result.public_id };
    }
    
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, {$set: payload})
    
    res.status(200).json(updatedRecipe);
  } catch (err) {
    console.log(err)
  }
});

//? Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id)
    if (recipe.picture) {
      await cloudinary.uploader.destroy(recipe.picture.cloudinary_id);
    }

    const result = await Recipe.findByIdAndDelete(id);
    res.status(200).json(result);

  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
