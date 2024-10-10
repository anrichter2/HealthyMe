import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      weight
      height
      workouts {
        _id
        exerciseDate
        exercises {
          exerciseName
          exerciseType
          exerciseDuration
          caloriesBurned
        }
      }
      foodIntake {
        _id
        intakeDate
        foods {
          foodName
          servingSize
          calories
        }
      }
    }
  }
`;

export const QUERY_FITNESS = gql`
  query fitness($fitnessId: ID!) {
    fitness (fitnessId: $fitnessId) {
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

export const QUERY_NUTRITION = gql`
  query nutrition($nutritionId: ID!) {
    nutrition (nutritionId: $nutritionId) {
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