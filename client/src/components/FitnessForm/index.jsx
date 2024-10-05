import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ADD_EXERCISE, ADD_FITNESS } from "../../utils/mutations";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Auth from '../../utils/auth'

const FitnessForm = () => {
    const [exerciseType, setExerciseType] = useState('Running');
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState(0);

    const [addFitness, {error1}] = useMutation(ADD_FITNESS);
    const [addExercise, {error2}] = useMutation(ADD_EXERCISE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    };

    const handleInputChange = async (event) => {
        const inputType = event.target.name;
        const inputValue = event.target.value;

        if (inputType === 'exerciseType') {
            setExerciseType(inputValue);
        } else if (inputType === 'exerciseDuration') {
            setExerciseDuration(inputValue)
        }
    }

    return (
        <div>
            <h3>Want to add an exercise you did?</h3>

            <form>
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
                </label>
            </form>
        </div>
    )
}