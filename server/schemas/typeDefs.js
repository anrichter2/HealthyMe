const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    weight: String
    height: String
    workouts: [Fitness]!
    foodIntake: [Nutrition]!
  }

  type Fitness {
    _id: ID
    exerciseDate: String
    # totalCalBurn: Int
    exercises: [Exercise]!
  }

  type Exercise {
    # _id: ID
    exerciseName: String
    exerciseType: String
    exerciseDuration: String
    caloriesBurned: Float
  }

  type Nutrition {
    _id: ID
    intakeDate: String
    # totalCalIntake: Int
    foods: [Food]
  }

  type Food {
    # _id: ID
    foodName: String
    servingSize: Int
    calories: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    fitness(fitnessId: ID!): Fitness
    nutrition(nutritionId: ID!): Nutrition
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFitness(exerciseDate: String!, exerciseName: String!, exerciseType: String!, exerciseDuration: String!, caloriesBurned: Float!): Fitness
    addNutrition(intakeDate: String!, foodName: String!, servingSize: Int!, calories: Float!): Nutrition
    addExercise(fitnessId: ID!, exerciseName: String!, exerciseType: String!, exerciseDuration: String!, caloriesBurned: Float!): Fitness
    addFood(nutritionId: ID!, foodName: String!, servingSize: Int!, calories: Float!): Nutrition
    removeFitness(fitnessId: ID!): Fitness
    removeNutrition(nutritionId: ID!): Nutrition
  }
`;

module.exports = typeDefs;
