import { Link } from 'react-router-dom';

const ExerciseList = ({
  exercises,
  title,
}) => {
  if (!exercises.length) {
    return <h3>No Exercises Yet</h3>;
  }

  return (
    <div className="container">
      {<h3>{title}</h3>}
      <div className="row">
        {exercises &&
          exercises.slice(0, 6).map((exercise) => (
            <div className="col-md-4 mb-4" key={exercise._id} >
              <div className="card h-100">
                <h4 className="card-header bg-primary text-light p-2 m-0">
                  <span style={{ fontSize: '1rem' }}>
                    {exercise.title}
                  </span>
                </h4>
                <div className="card-body bg-light p-2">
                  <img
                    style={{ maxWidth: "100%", height: "auto" }} className="img-fluid" src={exercise.thumbnailUrl} alt={exercise.thumbnailUrl} />
                </div>
                <p className="card-text bg-primary text-light p-2 m-0">
                  <span style={{ fontSize: '1rem' }}>
                    {exercise.description}
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExerciseList;
