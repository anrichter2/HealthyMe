import { useMutation } from "@apollo/client";
import { useState } from "react"
import { ADD_FOOD } from "../../utils/mutations";
import { QUERY_NUTRITION } from "../../utils/queries";

const NutritionFormSingleDay = ({nutritionId}) => {
    const [foodName, setFoodName] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [calories, setCalories] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [addFood, {error2}] = useMutation(ADD_FOOD, {
        refetchQueries: [
            QUERY_NUTRITION,
            'nutrition'
        ]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!foodName || !calories || !servingSize) {
            setErrorMessage('A food name, serving size and calories must be included')
        };

        try {
            const totalCalories = servingSize * calories
            const { data } = await addFood({
                variables: {
                    nutritionId: nutritionId, foodName, servingSize: parseInt(servingSize), calories: parseInt(totalCalories)
                },
            });

            setFoodName('');
            setServingSize('');
            setCalories('');
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
                <h3 className="card-header">Want to add a food you ate this day?</h3>
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

export default NutritionFormSingleDay