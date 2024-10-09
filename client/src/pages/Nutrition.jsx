import { useParams } from "react-router-dom";
import { QUERY_NUTRITION } from "../utils/queries";
import NutritionFormSingleDay from "../components/NutritionFormSingleDay";

const Nutrition = () => {

    const { nutritionId } = useParams();

    const { loading, data } = useQuery(QUERY_NUTRITION, {
        variables: { nutritionId: nutritionId },
    });

    const nutritionData = data?.nutritionDay || {};

    function sumCaloriesConsumed(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = arr[i].calories + sum
        };
        return sum
    };

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <div>
            <h2>
                This is all Nutrition data for {nutritionData.intakeDate}
            </h2>
            < NutritionFormSingleDay nutritionId={nutritionId}/>
            <div>
                {nutritionData.foods.length ? (
                    <div>
                        <h3>
                            All foods you ate this day
                        </h3>
                        {nutritionData.foods.map((food) => (
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{food.foodName}</h4>
                                    <p className="card-text">{food.servingSize}</p>
                                    <p className="card-text">{food.calories}</p>
                                </div>
                            </div>
                        ))}
                        <p>Total calories consumed this day: {sumCaloriesConsumed(nutritionData.foods)}</p>
                    </div>
                ) : (
                    <h3>No Nutrition data for this date</h3>
                )}
            </div>
        </div>
    );
};

export default Nutrition;