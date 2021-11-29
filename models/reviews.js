const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "Users"},
  recipe: {type: Schema.Types.ObjectId, ref: "Recipe"},
  title: {type: String, required: true},
  rating: {type: Number, required: true, default: 1, min: 0, max: 5},
  comment: String,
  removed: Boolean
}, {timestamps: true})

const Reviews = model("Reviews", reviewSchema);

module.exports = Reviews;