const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const mealPlanSchema = Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    currentStep: {type: Number, default: 0},
    shoppingList: [
      { name: String, unit: String, amount: Number, got: Boolean },
    ],
    removed: Boolean
  },
  { timestamps: true }
);

const MealPlan = model("mealPlan", mealPlanSchema);

module.exports = MealPlan;
