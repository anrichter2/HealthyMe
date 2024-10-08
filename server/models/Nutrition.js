const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const foodSchema = new Schema({
  intakeDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  foods: [
    {
      foodName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
      servingSize: {
        type: String,
        required: true,
      },
      calories: {
        type: Number,
        required: true,
        trim: true,
      },

    }
  ]

});

// FIX THIS TO CALCULATE THE TOTAL INTAKE CALORIES AND FOOD ARRAY
foodSchema.virtual('Nutrition').get(function() { 
  return {
    calories: this.calories,
    intakeDate: this.intakeDate,
  }
});

const Nutrition = model('Nutrition', foodSchema);

module.exports = Nutrition;
