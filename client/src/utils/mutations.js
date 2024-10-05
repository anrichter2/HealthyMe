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
  mutation addFitness($exerciseName: String!, $exerciseType: String!, $exerciseDuration: Int!, $caloriesBurned: Int!) {
    addFitness(exerciseName: $exerciseName, exerciseType: $exerciseType, exerciseDuration: $exerciseDuration, caloriesBurned: $caloriesBurned) {
      _id
      exerciseDate
      exercises {
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
      }
    }
  }
`;