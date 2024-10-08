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
  mutation addFitness($exerciseDate: String!, $exerciseName: String!, $exerciseType: String!, $exerciseDuration: Int!, $caloriesBurned: Int!) {
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
  mutation AddExercise($fitnessId: ID!, $exerciseName: String!, $exerciseType: String!, $exerciseDuration: Int!, $caloriesBurned: Int!) {
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
  mutation addFitness($intakeDate: String!, $foodName: String!, $servingSize: Int!, $calories: Int!) {
    addFitness(intakeDate: $intakeDate, foodName: $foodName, servingSize: $servingSize, calories: $calories) {
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
  mutation AddExercise($nutritionId: ID!, $foodName: String!, $servingSize: String!, $calories: Int!) {
    addExercise(nutritionId: $nutritionId, foodName: $foodName, servingSize: $servingSize, calories: $calories) {
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