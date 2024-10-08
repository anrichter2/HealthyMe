import { useState, useEffect } from 'react';
import Container from '../UI/Container';
import Row from '../UI/Row';
import Col from '../UI/Col';
import Card from '../UI/Card';
import SearchForm from './SearchForm';
// import SearchDetail from './SearchDetails'
// import ExerciseAPI from '../utils/exerciseAPI';
import { exerciseSearch } from '../utils/exerciseAPI.js'

const CaloriesContainer = () => {
  // Set state for the search result and the search query
  const [result, setResult] = useState(0);
  const [query, setQuery] = useState('');

  // When the search form is submitted, make api call
  // const exerciseCalories = (query) =>
    //   setResult(exerciseSearch(query))
  // .then((res) => {
    //   console.log(query)
    //   console.log(res)
    //   setResult(res.data)
    //   setQuery('')
    // })
    // .catch((err) => console.log(err));
    
    // When the component loads, use the API.search method to render a default search result
    // The empty optional array [] will cause the hook to only run one time after the component loads
    // Refer to https://react.dev/reference/react/useEffect#useeffect
    useEffect(() => {
    const test = exerciseSearch(query)
    test.then(data => setResult(data))
    // exerciseCalories();
  }, [query]);

  // Handler for input changes to the search form
  const handleInputChange = (e) => setQuery(e.target.value);

  // Handler for what happens when the search form is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // exerciseCalories(query);
    exerciseSearch(query)
  };

  // Destructure the result object to make the code more readable, assign them to empty strings to start
  console.log(result);

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `MovieDetail` card 
  If not, render a different header */

  return (
    <Container>
      <Row>
        <Col size="md-8">
          {/* <Card heading={Calories || 'Search for a meal or exercise to Begin'}>
            {Calories ? (
              <SearchDetail
                calories={Calories}
              />
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Card> */}
        </Col>
        <div>
          {result}
        </div>
        <Col size="md-4">
          <Card heading="Search">
            <SearchForm
              value={query}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CaloriesContainer;
