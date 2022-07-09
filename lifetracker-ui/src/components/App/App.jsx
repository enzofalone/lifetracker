// modules
import * as React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthContext from '../../contexts/auth'
import { API_BASE_URL } from "../../constants";
import apiClient from "../../services/apiClient"
import NutritionContext from "../../contexts/nutrition";
import ActivityContext from "../../contexts/activity";
// css
import "./App.css"

// components
import Navbar from './Navbar/Navbar';
import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import ActivityPage from './ActivityPage/ActivityPage';
import NutritionPage from './NutritionPage/NutritionPage';
import NotFound from './NotFound/NotFound';
import ExercisePage from "./ExercisePage/ExercisePage";
import ExerciseForm from "./ExerciseForm/ExerciseForm";
import ExerciseContext from "../../contexts/exercise";
import AccessForbidden from "./AccessForbidden/AccessForbidden";


export default function App() {
  const NOT_AUTH_MESSAGE = "You must be logged in to access that page";
  const registerFormInit = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: ''
  }

  // useState hooks
  const [registerForm, setRegisterForm] = React.useState(registerFormInit);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();
  // useContext hook
  const { userContext } = React.useContext(AuthContext);
  const [user, setUser] = userContext;

  const { activityContext } = React.useContext(ActivityContext);
  const [activity, setActivity] = activityContext;

  const {nutritionContext } = React.useContext(NutritionContext);
  const [nutrition, setNutrition] = nutritionContext;

  const {exerciseContext} = React.useContext(ExerciseContext);
  const [exercises, setExercises] = exerciseContext;
  //Log out handler
  const handleOnLogout = () => {
    //reset state to empty object
    setUser({});
    setNutrition({});
    setActivity({});
    setExercises({});
    //reset token from local storage
    localStorage.removeItem(apiClient.tokenName);
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar handleOnLogout={handleOnLogout} user={user} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />
            <Route path='/register' element={<RegistrationPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />} />

            <Route
              path='/activity'
              element={user?.email ?
                <ActivityPage user={user} />
                : <Navigate to='/forbidden' />} />

            <Route
              path='/nutrition/*'
              element={<NutritionPage user={user} />} />
            

            <Route
              path='/exercise/*'
              element={<ExercisePage user={user} />} />


            <Route
              path='/forbidden'
              element={<AccessForbidden/>}/>
            {/* {// TODO: render if user is logged in, otherwise, render AccessForbidden component*/}

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
