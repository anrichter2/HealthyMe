const { User, Fitness, Excercise, Nutrition, Food } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('workouts').populate('foodIntake');
      }
      throw AuthenticationError;
    },
    fitness: async (parent, { fitnessId }) => {
      return Fitness.findOne({ _id: fitnessId });
    },
    nutrition: async (parent, { nutritionId }) => {
      return Nutrition.findOne({ _id: nutritionId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addFitness: async (parent, { excerciseName, excerciseType, excerciseDuration, caloriesBurned }, context) => {
      if (context.user) {
      const fitness = await Fitness.create({ excerciseName, excerciseType, excerciseDuration, caloriesBurned })

      return fitness;
    }
    throw AuthenticationError;
  },
  addNutrition: async (parent, { foodName, calories }, context) => {
    if (context.user) {
      const nutrition = Nutrition.create({ foodName, calories })
      
      return nutrition
    }
    throw AuthenticationError;
  },
  addExcercise: async (parent, { fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned }, context) => {
    if (context.user) {
      const excercise = await Excercise.create({ fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned });
      
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { excercise: excercise._id } }
      );
      
      return excercise;
    }
    throw AuthenticationError;
  },
  addFood: async (parent, { nutritionId, foodName, calories }, context) => {
    if (context.user) {
      const food = await Food.create({ nutritionId, foodName, calories })
      
      await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { food: food._id } }
        );

        return food
      }
      throw AuthenticationError;
    },
    removeExcercise: async (parent, { fitnessId, excerciseId }, context) => {
      const excercise = await Excercise.findOneAndDelete({ fitnessId, excerciseId })

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { excercise: excercise._id } }
      );

      return excercise
    },
    removeFood: async (parent, { nutritionId, foodId }, context) => {
      const food = await Food.findOneAndDelete({ nutritionId, foodId })

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { food: food._id } }
      );

      return food
    }
  },
};

module.exports = resolvers;
