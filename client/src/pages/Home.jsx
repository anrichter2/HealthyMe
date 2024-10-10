import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import ExerciseList from '../components/ExerciseList';;
import defaultExercises from '../test_data/exercises';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const exercises = data?.exercises || defaultExercises;

  return (

    <>
      <div className='background'>
        <h1>Healthy Me</h1>
        <p>We're here to help you stay healthy!</p>
        <Link className="btn btn-lg btn-light m-2" to="/signup">
                Get Started!
        </Link>
      </div>

      <main>

        <div className="row row-cols-1 row-cols-md-3 g-6">
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ExerciseList
                exercises={exercises}
                title="Featured Workouts"
              />
            )}
          </div>
        </div>
      </main>
    </>




  );
};

export default Home;
