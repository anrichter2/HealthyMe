import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';
import FitnessForm from '../components/FitnessForm';
import FoodForm from '../components/FoodForm';
import FitnessList from '../components/FitnessList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  // const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  const { loading, data } = useQuery(QUERY_ME)

  const user = data?.me || {};
  // if (
  //   Auth.loggedIn() && 
  //   /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
  //   Auth.getProfile().authenticatedPerson.username === userParam
  // ) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2>
        This is {user.usernames}'s Profile Page
      </h2>
      <div>
        {/* <LineGraph />
        <LineGraph /> */}
      </div>
      <div>
        <FitnessForm workouts={user.workouts}/>
        <FoodForm foodIntake={user.foodIntake}/>
      </div>
      <div>
        <div>
          <div>
            <h3>
              Workout Data for {user.userName}
            </h3>
            <FitnessList workouts={user.workouts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
