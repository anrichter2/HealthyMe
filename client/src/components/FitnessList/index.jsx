import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'
import { REMOVE_FITNESS } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';


const FitnessList = ({ workouts }) => {

    const [removeFitness, {error} ] = useMutation(REMOVE_FITNESS, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    });

    function sumCaloriesBurned(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = arr[i].caloriesBurned + sum
        };
        return sum
    };

    if (!workouts.length) {
        return <h3>Currently you have no workouts on record</h3>
    };

    const handleButtonClick = async (event) => {
        const fitnessId = event.target.value
        
        try {
            const { data } = await removeFitness({
                variables: {
                    fitnessId
                }
            });
        } catch (err) {
            console.log(err)
        }
    };

    // function dateConverter(string) {
    //     const dateString = string

    //     const cleanDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1').replace('at ', '')

    //     const date = new Date(cleanDateString)

    //     const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
    //         date.getDate().toString().padStart(2, '0') + '/' +
    //         date.getFullYear();

    //     return formattedDate
    // }

    return (
        <div>
            {workouts.map((workout) => (
                <div key={workout._id} className='card'>
                    <div className='card-body'>
                        <Link to={`/fitness/${workout._id}`} className='card-title'>
                            Data from {workout.exerciseDate}
                        </Link>
                        {workout.exercises.length ? (
                            <div>
                                <p className='card-text'>You currently have {workout.exercises.length} exercises logged on this date.</p>
                                <p className='card-text'>You burned a total of {sumCaloriesBurned(workout.exercises)} calories</p>
                                <button
                                    className='btn btn-danger'
                                    value={workout._id}
                                    onClick={(event) => handleButtonClick(event)}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <p>You have no exercise data for this date</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default FitnessList