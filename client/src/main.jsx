import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Fitness from './pages/Fitness.jsx';
import Nutrition from './pages/Nutrition.jsx';
import Error from './pages/Error';
import Exercise from './pages/Exercise.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/fitness/:fitnessId',
        element: <Fitness />
      }, {
        path: '/nutrition/:nutritionId',
        element: <Nutrition />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
