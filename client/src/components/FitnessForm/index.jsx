import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react"
import { ADD_EXERCISE, ADD_FITNESS } from "../../utils/mutations";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Auth from '../../utils/auth'

import { exerciseSearch } from "../utils/exerciseAPI";
import { QUERY_ME } from "../../utils/queries";

const FitnessForm = ({ workouts }) => {
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseType, setExerciseType] = useState('Running');
    const [exerciseDuration, setExerciseDuration] = useState('');
    const [date, setDate] = useState(new Date());
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [query, setQuery] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const [addFitness, { error1 }] = useMutation(ADD_FITNESS, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    });
    const [addExercise, { error2 }] = useMutation(ADD_EXERCISE, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!exerciseName || !exerciseDuration || !date) {
            setErrorMessage('An exercise name, duration and date must be included')
        };

        try {
            


            const dateString = date.toLocaleDateString();
            const checkForDate = obj => obj.exerciseDate === dateString
            if (workouts.some(checkForDate)) {
                const fitnessObject = workouts.find(obj => obj.exerciseDate === dateString)
                
                const { data } = await addExercise({
                    variables: {
                        fitnessId: fitnessObject._id, exerciseName, exerciseType, exerciseDuration, caloriesBurned
                    }
                });
            } else {
                
                const { data } = await addFitness({
                    variables: {
                        exerciseDate: date, exerciseName, exerciseType, exerciseDuration, caloriesBurned
                    }
                });
            }

            setExerciseName('')
            setExerciseType('Running');
            setExerciseDuration('');
            setDate(new Date())
        } catch (err) {
            console.log(err)
        }
    };

    const handleInputChange = (event) => {
        const inputType = event.target.name;
        const inputValue = event.target.value;

        
        if (inputType === 'exerciseName') {
            setExerciseName(inputValue)
        } else if (inputType === 'exerciseType') {
            setExerciseType(inputValue);
        } else if (inputType === 'exerciseDuration') {
            setExerciseDuration(inputValue)
        }


        
    };

    useEffect(() => { if (exerciseName && exerciseDuration !== '') setQuery(exerciseName + ' ' + exerciseDuration) }, [exerciseName, exerciseDuration])
    useEffect(() => {
        async function APICall() {
            const test = await exerciseSearch(query)
            setCaloriesBurned(test)
        }
        APICall()
    }, [query])

    return (
        <div className="col-12 col-md-6">
            <div className="card">
                <h3 className="card-header">Want to add an exercise you did?</h3>
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
                        <label className="text-center">
                            Exercise Date:
                            <DatePicker selected={date} onChange={(date) => {
                                // const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                                //     date.getDate().toString().padStart(2, '0') + '/' +
                                //     date.getFullYear()
                                // setDate(formattedDate)
                                setDate(date)
                            }} />
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
    )
};

export default FitnessForm