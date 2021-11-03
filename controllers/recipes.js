const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes");
const cloudinary = require("../imageUtility/cloudinary");
const upload = require("../imageUtility/multer");
const Users = require("../models/users");

//* Routes
//* Initial Seed
router.get("/seed", async (req, res) => {
  await Recipe.deleteMany({});

  const eggsBenedict = new Recipe({
    name: "Eggs Benedict",
    description: "The no. 1 Breakfast Egg",
    tags: ["Beginner", "Egg"],
    type: "Breakfast",
    time: { hour: 0, minutes: 20 },
    ingredients: [
      { name: "Eggs", unit: "", amount: 4 },
      { name: "White/Rice Vinegar", unit: "tbs", amount: 2 },
      { name: "Butter", unit: "g", amount: 100 },
      { name: "Chopped Parsley", unit: "tbs", amount: 2 },
    ],
    picture: {
      avatar:
        "https://media-cdn.tripadvisor.com/media/photo-m/1280/14/ab/bf/5e/eggs-ben-with-bacon-delicious.jpg",
    },
    steps: [
      {
        title: "Bring the poaching water to a simmer",
        body: "Bring a large saucepan two-thirds-filled with water to a boil, then add the vinegar. Bring the water to a boil again, then lower the heat to a bare simmer.",
      },
    ],
  });
  await eggsBenedict.save();

  const chickenRice = new Recipe({
    name: "Chicken Rice",
    description: "The only rice you need",
    tags: ["Beginner", "Chicken", "Asian Cuisine"],
    type: "Lunch",
    time: { hour: 2, minutes: 0 },
    ingredients: [
      { name: "Rice", unit: "cups", amount: 2 },
      { name: "Chicken", unit: "kg", amount: 1 },
      { name: "Garlic", unit: "cloves", amount: 4 },
    ],
    picture: {
      avatar:
        "https://asianinspirations.com.au/wp-content/uploads/2019/07/R00376-Hainanese_Chicken_Rice-2.jpg",
    },
    steps: [
      {
        title: "Cook the rice",
        body: "Wash rice, add pandan leaves, cook rice",
      },
      { title: "Steam chicken", body: "Season chicken with salt and steam" },
    ],
  });
  await chickenRice.save();

  const pasta = new Recipe({
    name: "Bolognese Pasta",
    description: "All day errday",
    tags: ["Beginner", "Pasta"],
    type: "Dinner",
    time: { hour: 1, minutes: 30 },
    ingredients: [
      { name: "Minced meat", unit: "kg", amount: 1 },
      { name: "Onions", unit: "g", amount: 500 },
      { name: "Tomato Paste", unit: "g", amount: 400 },
      { name: "Parmesan Cheese", unit: "tbs", amount: 1 },
    ],
    picture: {
      avatar:
        "https://recipetineats.com/wp-content/uploads/2018/07/Spaghetti-Bolognese.jpg",
    },
    steps: [
      {
        title: "Cook the sauce first",
        body: "Cook the meat slightly before adding tomato paste, water and a pinch of salt",
      },
    ],
  });
  await pasta.save();
  res.send([eggsBenedict, chickenRice, pasta]);
});

//? Index (All)
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

//? Create
router.post("/new", upload.single("avatar"), async (req, res) => {
  console.log("req.file", req.file);
  try {
    // Upload image to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.picture = {
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      };
    }
    const recipes = await Recipe.create(req.body, (err, createRecipe) => {
      console.log("req.body", req.body);
      console.log("recipe created", createRecipe);
      console.log("error", err);
    });
    res.json(recipes);
  } catch (err) {
    console.log(err);
  }
});

//? Show
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recipies = await Recipe.findById(id);
  res.json(recipies);
});

//? Edit
router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const recipies = await Recipe.findByIdAndUpdate(id, req.body);
  res.json(recipies);
});

//? Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Recipe.findByIdAndDelete(id);
    //? SEND BACK THE RESULT TO REACT SO IT CAN UPDATE
    res.json(result);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
