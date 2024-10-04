const { User, Fitness, Exercise, Nutrition, Food } = require('../models');
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
    addFitness: async (parent, { exerciseName, exerciseType, exerciseDuration, caloriesBurned }, context) => {
      if (context.user) {
      const fitness = await Fitness.create({ exerciseName, exerciseType, exerciseDuration, caloriesBurned })

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
  addExercise: async (parent, { fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned }, context) => {
    if (context.user) {
      const exercise = await Exercise.create({ fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned });
      
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { exercise: exercise._id } }
      );
      
      return exercise;
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
    removeExercise: async (parent, { fitnessId, exerciseId }, context) => {
      const exercise = await Exercise.findOneAndDelete({ fitnessId, exerciseId })

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { exercise: exercise._id } }
      );

      return exercise
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
