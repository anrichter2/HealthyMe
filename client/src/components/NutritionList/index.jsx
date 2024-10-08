import { Link } from 'react-router-dom'

const NutritionList = ({ foodIntake }) => {

    function sumCaloriesConsumed(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = arr[i].calories + sum
        };
        return sum
    };

    if (!foodIntake.length) {
        return <h3>Currently you have no foods on record</h3>
    }

    return (
        <div>
            {foodIntake.map((food) => (
                <div key={food._id} className='card'>
                    <div className='card-body'>
                        <Link to={`/profile/${food._id}`} className='card-title'>
                            Data from {food.intakeDate}
                        </Link>
                        {food.foods.length ? (
                            <div>
                                <p className='card-text'>You currently have {food.foods.length} foods logged on this date.</p>
                                <p className='card-text'>You consumed a total of {sumCaloriesConsumed(food.foods)} calories</p>
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