import { useQuery } from '@apollo/client';

import ExerciseList from '../components/ExerciseList';
import ThoughtForm from '../components/ThoughtForm';
import defaultExercises from '../test_data/exercises';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const exercises = data?.exercises || defaultExercises;

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ExerciseList
              exercises={exercises}
              title="List of Exercises"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
