import { useQuery } from '@apollo/client';

import FitnessForm from '../components/FitnessForm';
import NutritionForm from '../components/NutritionForm';
import FitnessList from '../components/FitnessList';
import NutritionList from '../components/NutritionList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME)

  const user = data?.me || {};
  // console.log(user.workouts)

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
    <div className='flex-column'>
      <h2>
        This is {user.username}'s Profile Page
      </h2>
      <div>
        {/* <LineGraph />
        <LineGraph /> */}
      </div>
      <div className='flex-row my-3'>
        <FitnessForm workouts={user.workouts}/>
        <NutritionForm foodIntake={user.foodIntake}/>
      </div>
      <div>
        <div className='flex-row'>
          <div className='col-12 col-lg-6'>
            <h3>
              Workout Data for {user.username}
            </h3>
            <FitnessList workouts={user.workouts} />
          </div>
          <div className='col-12 col-lg-6'>
            <h3>
              Nutrition Data for {user.username}
            </h3>
            <NutritionList foodIntake={user.foodIntake} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
