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
  exerciseDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  caloriesBurned: {
    type: Number,
  },
});

// FIX THIS TO DISPLAY EXERCISE ARRAY AND TOTAL CALORIES BURNED
ExerciseSchema.virtual('Fitness').get(function() {
  return {
    exerciseType: this.exerciseType,
    exerciseDuration: this.exerciseDuration,
    caloriesBurned: this.caloriesBurned,
    exerciseDate: this.exerciseDate,
  }
});

const Fitness = model('Fitness', exerciseSchema);

module.exports = Fitness;
