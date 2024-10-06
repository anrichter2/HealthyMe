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
    addFitness: async (parent, { exerciseDate, exerciseType, exerciseDuration, caloriesBurned }, context) => {
      if (context.user) {
        // Might need to specify that some of these values are part of array called exercises or use addtoSet
        const fitness = await Fitness.create({ exerciseDate, exerciseType, exerciseDuration, caloriesBurned })

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: fitness._id } }
        )
        return fitness;
      }
    throw AuthenticationError;
  },
  addNutrition: async (parent, { intakeDate, foodName, servingSize, calories }, context) => {
    if (context.user) {
      const nutrition = Nutrition.create({ intakeDate, foodName, servingSize, calories })
      
      await user.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { foodIntake: nutrition._id}}
      )
      return nutrition
    }
    throw AuthenticationError;
  },
  addExercise: async (parent, { fitnessId, exerciseType, exerciseDuration, caloriesBurned }, context) => {
    if (context.user) {
      // const exercise = await Exercise.create({ fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned });
      
      return Fitness.findOneAndUpdate(
        { _id: fitnessId },
        {
          $addToSet: {
            exercises: {exerciseType, exerciseDuration, caloriesBurned},
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      
    }
    throw AuthenticationError;
  },
  addFood: async (parent, { nutritionId, foodName, servingSize, calories }, context) => {
    if (context.user) {
      // const food = await Food.create({ nutritionId, foodName, calories })
      
      await Nutrition.findOneAndUpdate(
        { _id: nutritionId },
        {
          $addToSet: {
            foods: { foodName, servingSize, calories },
          },
        },
        {
          new: true,
          runValidators: true,
        }
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
