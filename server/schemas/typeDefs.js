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
    caloriesBurned: Int
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
    calories: Int
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
    addFitness(exerciseDate: String!, exerciseName: String!, exerciseType: String!, exerciseDuration: String!, caloriesBurned: Int!): Fitness
    addNutrition(intakeDate: String!, foodName: String!, servingSize: String!, calories: Int!): Nutrition
    addExercise(fitnessId: ID!, exerciseName: String!, exerciseType: String!, exerciseDuration: String!, caloriesBurned: Int!): Fitness
    addFood(nutritionId: ID!, foodName: String!, servingSize: String!, calories: Int!): Nutrition
    removeExercise(fitnessId: ID!, exerciseID: ID!): Fitness
    removeFood(nutritionId: ID!, foodId: ID!): Nutrition
  }
`;

module.exports = typeDefs;
