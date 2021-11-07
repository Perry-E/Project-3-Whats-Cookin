const { Schema, model } = require("mongoose");

const recipeSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: {type: [String], default: undefined},
    type: String,
    time: {
      hour: Number,
      minutes: { type: Number, min: 0, max: 59 },
    },
    ingredients: [{ amount: Number, unit: String, name: String }],
    picture: {
      url: String,
      cloudinary_id: String,
    },
    steps: [{ title: String, body: String }],
    owner: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

//* should be singular not plural
const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
