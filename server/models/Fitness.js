const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema({
  exerciseDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  exercises: [
    {
      exerciseName: {
        type: String,
        required: true,
      },
      exerciseType: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
      exerciseDuration: {
        type: String,
        required: true,
      },
      caloriesBurned: {
        type: Number,
      },
    }
  ],
});

// FIX THIS TO DISPLAY EXERCISE ARRAY AND TOTAL CALORIES BURNED
exerciseSchema.virtual('Fitness').get(function() {
  return {
    exerciseType: this.exerciseType,
    exerciseDuration: this.exerciseDuration,
    caloriesBurned: this.caloriesBurned,
    exerciseDate: this.exerciseDate,
  }
});

const Fitness = model('Fitness', exerciseSchema);

module.exports = Fitness;
