import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ADD_EXERCISE } from "../../utils/mutations";

const FitnessFormSingleDay = ({fitnessId}) => {
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseType, setExerciseType] = useState('Running');
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [addExercise, {error2}] = useMutation(ADD_EXERCISE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!exerciseDuration || !exerciseName) {
            setErrorMessage('An exercise name and duration must be included')
        };

        try {
            // Add code here for finding the calories burned from api fetch with variable called caloriesBurned
            const { data } = await addExercise({
                variables: {
                    fitnessId: fitnessId, exerciseName, exerciseType, exerciseDuration
                }
            })

            setExerciseName('')
            setExerciseType('Running');
            setExerciseDuration('');
        } catch (err) {
            console.log(err)
        };
    };

    const handleInputChange = async (event) => {
        const inputType = event.target.name;
        const inputValue = event.target.value;

        if (inputType === 'exerciseName') {
            setExerciseName(inputValue)
        } else if (inputType === 'exerciseType') {
            setExerciseType(inputValue);
        } else if (inputType === 'exerciseDuration') {
            setExerciseDuration(inputValue)
        };
    };

    return (
        <div className="col-12 col-md-6">
            <div className="card">
                <h3 className="card-header">Want to add an exercise you did this day?</h3>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit} className="d-flex flex-column text">
                        <label className="form-label">
                            Exercise Name:
                            <input
                                className="form-control"
                                value={exerciseName}
                                name="exerciseName"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="text-center">
                            Exercise Type:
                            <select name="exerciseType" value={exerciseType} onChange={handleInputChange}>
                                <option value='Running'>Running</option>
                                <option value='Weight Lifting'>Weight Lifting</option>
                                <option value='Biking'>Biking</option>
                                <option value='Swimming'>Swimming</option>
                                <option value='Walking'>Walking</option>
                            </select>
                        </label>
                        <label className="form-label">
                            Exercise Duration:
                            <input
                                className="form-control"
                                value={exerciseDuration}
                                name="exerciseDuration"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className="text-center my-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    {errorMessage && (
                        <div>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FitnessFormSingleDay