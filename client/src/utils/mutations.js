import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_FITNESS = gql`
  mutation addFitness($exerciseDate: String!, $exerciseName: String!, $exerciseType: String!, $exerciseDuration: String!, $caloriesBurned: Float!) {
    addFitness(exerciseDate: $exerciseDate, exerciseName: $exerciseName, exerciseType: $exerciseType, exerciseDuration: $exerciseDuration, caloriesBurned: $caloriesBurned) {
      _id
      exerciseDate
      exercises {
        exerciseName
        exerciseType
        exerciseDuration
        caloriesBurned
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation AddExercise($fitnessId: ID!, $exerciseName: String!, $exerciseType: String!, $exerciseDuration: String!, $caloriesBurned: Float!) {
    addExercise(fitnessId: $fitnessId, exerciseName: $exerciseName, exerciseType: $exerciseType, exerciseDuration: $exerciseDuration, caloriesBurned: $caloriesBurned) {
      _id
      exerciseDate
      exercises {
        caloriesBurned
        exerciseDuration
        exerciseType
        exerciseName
      }
    }
  }
`;

export const ADD_NUTRITION = gql`
  mutation addNutrition($intakeDate: String!, $foodName: String!, $servingSize: Int!, $calories: Float!) {
    addNutrition(intakeDate: $intakeDate, foodName: $foodName, servingSize: $servingSize, calories: $calories) {
      _id
      intakeDate
      foods {
        foodName
        servingSize
        calories
      }
    }
  }
`;

export const ADD_FOOD = gql`
  mutation addFood($nutritionId: ID!, $foodName: String!, $servingSize: Int!, $calories: Float!) {
    addFood(nutritionId: $nutritionId, foodName: $foodName, servingSize: $servingSize, calories: $calories) {
      _id
      intakeDate
      foods {
        foodName
        servingSize
        calories
      }
    }
  }
`;

export const REMOVE_FITNESS = gql`
  mutation removeFitness($fitnessId: ID!) {
    removeFitness(fitnessId: $fitnessId) {
      _id
      exerciseDate
      exercises {
        caloriesBurned
        exerciseDuration
        exerciseType
        exerciseName
      }
    }
  }
`;

export const REMOVE_NUTRITION = gql`
  mutation removeNutrition($nutritionId: ID!) {
    removeNutrition(nutritionId: $nutritionId) {
      _id
      intakeDate
      foods {
        foodName
        servingSize
        calories
      }
    }
  }
`;