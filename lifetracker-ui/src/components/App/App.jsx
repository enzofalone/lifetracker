// modules
import * as React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthContext from '../../contexts/AuthProvider'
import { API_BASE_URL } from "../../constants";
import apiClient from "../../services/apiClient"
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
import NutritionForm from "./NutritionForm/NutritionForm";
import ExercisePage from "./ExercisePage/ExercisePage";
import ExerciseForm from "./ExerciseForm/ExerciseForm";

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
  const [nutrition, setNutrition] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  // useContext hook
  const { auth, setAuth } = React.useContext(AuthContext);


  React.useEffect(() => {
    // if user token exists in local storage, 
    // get token and fetch from the db
    // to see if token is valid
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const { data, error } = await apiClient.fetchUserFromToken();
        if (data) setAuth({ ...data, loggedIn: true });
        if (error) setErrorMessage(error);
      } catch (error) {
        console.error("Fetching user from token error:", error);
      }

      setIsFetching(false);
    }

    const token = localStorage.getItem(apiClient.tokenName);

    if (token !== 'null') {
      apiClient.setToken(token);
      console.log(token)
      //if a token exists, get user data
      fetchData();
      // get all nutrition items of user for nutrition section
      // fetchNutrition();
    }
  }, []);

  React.useEffect(() => {
    const fetchNutrition = async () => {
      setIsFetching(true);
      
      try {
        const { dataNutrition, errorNutrition } = await apiClient.fetchNutrition();

        if (errorNutrition) setErrorMessage(errorNutrition);
        if (dataNutrition?.nutrition) setNutrition(dataNutrition?.nutritions);
      } catch (error) {
        console.error("Fetching data error:", error);
      }

      setIsFetching(false);
    }
    fetchNutrition();
  }, []);


  //Log out handler
  const handleOnLogout = () => {
    //reset state to empty object
    setAuth({});
    //reset token from local storage
    apiClient.setToken(null);
  }

  if (isFetching) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar handleOnLogout={handleOnLogout} auth={auth} />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} setAuth={setAuth} auth={auth} />} />
            <Route path='/register' element={<RegistrationPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} setAuth={setAuth} auth={auth} />} />
            {/* TODO: CREATE AUTHORIZED ROUTES */}
            <Route
              path='/activity'
              element={auth.loggedIn ?
                <ActivityPage auth={auth} />
                : <Navigate to='/login' />} />

            <Route
              path='/nutrition'
              element={auth.loggedIn ?
                <NutritionPage nutrition={nutrition} setIsFetching={setIsFetching} isFetching={isFetching} auth={auth} />
                : <Navigate to='/login' />} />

            <Route
              path='/exercise'
              element={auth.loggedIn ?
                <ExercisePage auth={auth} />
                : <Navigate to='/login' />} />

            <Route
              path='/exercise/create'
              element={auth.loggedIn ?
                <ExerciseForm auth={auth} />
                : <Navigate to='/login' />} />

            <Route
              path='/nutrition/create'
              element={auth.loggedIn ?
                <NutritionForm auth={auth} setNutrition={setNutrition} />
                : <Navigate to='/login' />} />

            {/* {// TODO: render if user is logged in, otherwise, render AccessForbidden component*/}

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
