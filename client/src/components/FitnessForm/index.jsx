import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ADD_EXERCISE, ADD_FITNESS } from "../../utils/mutations";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Auth from '../../utils/auth'

const FitnessForm = ({workouts}) => {
    const [exerciseType, setExerciseType] = useState('Running');
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [date, setDate] = useState(new Date());
    // const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const [addFitness, {error1}] = useMutation(ADD_FITNESS);
    const [addExercise, {error2}] = useMutation(ADD_EXERCISE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!exerciseDuration || !date) {
            setErrorMessage('An exercise duration and date must be included')
        };
        
        try {
            // Add code here for finding the calories from api fetch with variable called caloriesBurned
            const checkForDate = obj => obj.exerciseDate === date
            if (workouts.some(checkForDate)) {
                const fitnessObject = workouts.find(obj => obj.exerciseDate === date)
                const { data } = await addExercise({
                    variables: {
                        fitnessId: fitnessObject._id, exerciseType, exerciseDuration, caloriesBurned
                    }
                });
            } else {
                const { data } = await addFitness({
                    variables: {
                        exerciseDate: date, exerciseType, exerciseDuration, caloriesBurned
                    }
                });
            };
        } catch (err) {
            console.log(err)
        }
    };

    const handleInputChange = async (event) => {
        const inputType = event.target.name;
        const inputValue = event.target.value;

        if (inputType === 'exerciseType') {
            setExerciseType(inputValue);
        } else if (inputType === 'exerciseDuration') {
            setExerciseDuration(inputValue)
        };
    };

    return (
        <div>
            <h3>Want to add an exercise you did?</h3>

            <form onSubmit={handleFormSubmit}>
                <label>
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
                <label>
                    Exercise Date:
                    <DatePicker selected={date} onChange={(date) => setDate(date)}/>
                </label>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            {errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    )
};

export default FitnessForm