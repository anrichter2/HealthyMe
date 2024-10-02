const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

foodSchema.virtual('Nutrition').get(function() {
  return this.calories; // FIX THIS
});

const Food = model('Food', foodSchema);

module.exports = Food;
