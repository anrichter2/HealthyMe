import { useParams } from "react-router-dom";
import { QUERY_FITNESS } from "../utils/queries";
import FitnessFormSingleDay from "../components/FitnessFormSingleDay";
import { useQuery } from "@apollo/client";

const Fitness = () => {

    const { fitnessId } = useParams();

    const { loading, data } = useQuery(QUERY_FITNESS, {
        variables: { fitnessId: fitnessId },
    });

    const fitnessData = data?.fitness || {};

    function sumCaloriesBurned(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = arr[i].caloriesBurned + sum
        };
        return sum
    };

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <div>
            <h2>
                This is all exercise data for {fitnessData.exerciseDate}
            </h2>
            < FitnessFormSingleDay fitnessId={fitnessId}/>
            <div>
                {fitnessData.exercises.length ? (
                    <div>
                        <h3>
                            All exercise you did this day
                        </h3>
                        {fitnessData.exercises.map((exercise) => (
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Exercise Name: {exercise.exerciseName}</h4>
                                    <p className="card-text">Exercise Type: {exercise.exerciseType}</p>
                                    <p className="card-text">Exercise Duration: {exercise.exerciseDuration}</p>
                                    <p className="card-text">Calories Burned: {exercise.caloriesBurned}</p>
                                </div>
                            </div>
                        ))}
                        <p>Total calories burned this day: {sumCaloriesBurned(fitnessData.exercises)}</p>
                    </div>
                ) : (
                    <h3>No exercise data for this date</h3>
                )}
            </div>
        </div>
    );
};

export default Fitness;