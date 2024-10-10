import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'
import { REMOVE_NUTRITION } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const NutritionList = ({ foodIntake }) => {

    const [removeNutrition, {error} ] = useMutation(REMOVE_NUTRITION, {
        refetchQueries: [
            QUERY_ME,
            'me'
        ]
    })

    function sumCaloriesConsumed(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = arr[i].calories + sum
        };
        return sum
    };

    if (!foodIntake.length) {
        return <h3>Currently you have no foods on record</h3>
    };

    const handleButtonClick = async (event) => {
        const nutritionId = event.target.value
        
        try {
            const { data } = await removeNutrition({
                variables: {
                    nutritionId
                }
            });
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            {foodIntake.map((food) => (
                <div key={food._id} className='card'>
                    <div className='card-body'>
                        <Link to={`/nutrition/${food._id}`} className='card-title'>
                            Data from {food.intakeDate}
                        </Link>
                        {food.foods.length ? (
                            <div>
                                <p className='card-text'>You currently have {food.foods.length} foods logged on this date.</p>
                                <p className='card-text'>You consumed a total of {sumCaloriesConsumed(food.foods)} calories</p>
                                <button
                                    className='btn btn-danger'
                                    value={food._id}
                                    onClick={(event) => handleButtonClick(event)}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <p>You have no food data for this date</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default NutritionList