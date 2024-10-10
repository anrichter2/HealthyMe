import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ADD_NUTRITION, ADD_FOOD } from "../../utils/mutations";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { QUERY_ME } from "../../utils/queries";

const NutritionForm = ({ foodIntake }) => {
    const [foodName, setFoodName] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState('');

    const [addNutrition, {error1}] = useMutation(ADD_NUTRITION, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    });
    const [addFood, {error2}] = useMutation(ADD_FOOD, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!foodName || !calories || !servingSize) {
            setErrorMessage('A food name, serving size and calories must be included')
        };

        try {
            const dateString = date.toLocaleDateString();
            const checkForDate = obj => obj.intakeDate === dateString
            if (foodIntake.some(checkForDate)) {
                const totalCalories = servingSize * calories
                const NutritionObject = foodIntake.find(obj => obj.intakeDate === dateString)
                const { data } = await addFood({
                    variables: {
                        nutritionId: NutritionObject._id, foodName, servingSize: parseInt(servingSize), calories: parseInt(totalCalories)
                    },
                });
            } else {
                const totalCalories = servingSize * calories
                const { data } = await addNutrition({
                    variables: {
                        intakeDate: date, foodName, servingSize: parseInt(servingSize), calories: parseInt(totalCalories)
                    }
                });
            };

            setFoodName('');
            setServingSize('');
            setCalories('');
            setDate(new Date());
            setErrorMessage('');
        } catch (err) {
            console.log(err)
        }
    };

    const handleInputChange = async (event) => {
        const inputType = event.target.name;
        const inputValue = event.target.value;

        if (inputType === 'foodName') {
            setFoodName(inputValue);
        } else if (inputType === 'servingSize') {
            setServingSize(inputValue);
        } else {
            setCalories(inputValue);
        }
    };

    return (
        <div className="col-12 col-md-6">
            <div className="card">
                <h3 className="card-header">Want to add a food you ate?</h3>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit} className="d-flex flex-column">
                        <label className="form-label">
                            Name of the food:
                            <input
                                className="form-control"
                                value={foodName}
                                name="foodName"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-label">
                            How many servings:
                            <input
                                className="form-control"
                                value={servingSize}
                                name="servingSize"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="form-label">
                            How many calories per serving:
                            <input
                                className="form-control"
                                value={calories}
                                name="calories"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="text-center">
                            Exercise Date:
                            <DatePicker selected={date} onChange={(date) => setDate(date)} />
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

export default NutritionForm