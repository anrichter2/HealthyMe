const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema({
  exerciseType: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  exerciseDuration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  caloriesBurned: {
    type: Number,
  },
});

ExerciseSchema.virtual('Fitness').get(function() {
  return this.caloriesBurned; // FIX THIS 
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
