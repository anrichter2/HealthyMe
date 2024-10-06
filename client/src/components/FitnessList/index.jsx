import {Link} from 'react-router-dom'

const FitnessList = ({workouts}) => {

    if (!workouts.length) {
        return <h3>Currently you have no workouts on record</h3>
    }

    return (
        <div>
            {workouts.map((workout) => (
                <div key={workout._id} className='card'>
                    <Link to={`/profile/${workout._id}`} className='card-title'>
                        Data from {workout.exerciseDate}
                    </Link>
                </div>
            ))}
        </div>
    )
};

export default FitnessList