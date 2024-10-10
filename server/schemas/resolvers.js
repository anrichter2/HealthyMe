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
    fitness: async (parent, { fitnessId }, context) => {
      if (context.user) {
        return Fitness.findOne({ _id: fitnessId }).populate('exercises');
      }
    },
    nutrition: async (parent, { nutritionId }, context) => {
      if (context.user) {
        return Nutrition.findOne({ _id: nutritionId }).populate('foods');
      }
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
    addFitness: async (parent, { exerciseName, exerciseDate, exerciseType, exerciseDuration, caloriesBurned }, context) => {
      if (context.user) {
        
        const fitness = await Fitness.create({ exerciseDate });

        await Fitness.findOneAndUpdate(
          {_id: fitness._id },
          { $addToSet: { exercises: { exerciseName, exerciseType, exerciseDuration, caloriesBurned }}}
        );

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: fitness._id } }
        );
        return fitness;
      }
    throw AuthenticationError;
  },
  addNutrition: async (parent, { intakeDate, foodName, servingSize, calories }, context) => {
    if (context.user) {
      const nutrition = await Nutrition.create({ intakeDate })
      
      await Nutrition.findOneAndUpdate(
        { _id: nutrition._id },
        { $addToSet: { foods: { foodName, servingSize, calories }}}
      );

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { foodIntake: nutrition._id}}
      );
      
      return nutrition
    }
    throw AuthenticationError;
  },
  addExercise: async (parent, { fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned }, context) => {
    if (context.user) {
      // const exercise = await Exercise.create({ fitnessId, exerciseName, exerciseType, exerciseDuration, caloriesBurned });
      
      return Fitness.findOneAndUpdate(
        { _id: fitnessId },
        {
          $addToSet: {
            exercises: { exerciseName, exerciseType, exerciseDuration, caloriesBurned },
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

      }
      throw AuthenticationError;
    },
    removeFitness: async (parent, { fitnessId }, context) => {
      if (context.user) {
        const fitness = await Fitness.findOneAndDelete({ _id: fitnessId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: fitness._id } }
        );

        return fitness
      }
      throw AuthenticationError;

    },
    removeNutrition: async (parent, { nutritionId }, context) => {
      if (context.user) {
        const nutrition = await Nutrition.findOneAndDelete({ _id: nutritionId })
  
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { foodIntake: nutrition._id } }
        );
  
        return nutrition
      }
      throw AuthenticationError
    }
  },
};

module.exports = resolvers;
