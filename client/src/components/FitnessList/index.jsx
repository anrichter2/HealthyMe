import { Link } from 'react-router-dom'

const FitnessList = ({ workouts }) => {

    // console.log(workouts)
    // Not 100% sure this works
    function sumCaloriesBurned(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = arr[i].caloriesBurned + sum
        };
        return sum
    };

    if (!workouts.length) {
        return <h3>Currently you have no workouts on record</h3>
    }

    function dateConverter(string) {
        const dateString = string

        const cleanDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1').replace('at ', '')

        const date = new Date(cleanDateString)

        const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
            date.getDate().toString().padStart(2, '0') + '/' +
            date.getFullYear();

        return formattedDate
    }// console.log(formattedDate)

    return (
        <div>
            {workouts.map((workout) => (
                <div key={workout._id} className='card'>
                    <div className='card-body'>
                        <Link to={`/profile/${workout._id}`} className='card-title'>
                            Data from {dateConverter(workout.exerciseDate)}
                        </Link>
                        {workout.exercises.length ? (
                            <div>
                                <p className='card-text'>You currently have {workout.exercises.length} exercises logged on this date.</p>
                                <p className='card-text'>You burned a total of
                                    {/* {workout.exercises} */}
                                    {sumCaloriesBurned(workout.exercises)} calories</p>
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