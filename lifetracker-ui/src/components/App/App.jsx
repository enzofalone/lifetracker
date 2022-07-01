// modules
import * as React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthContext from '../../contexts/AuthProvider'

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
import axios from "axios";
import { API_BASE_URL } from "../../constants";

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

  // AuthContext
  const { auth, setAuth } = React.useContext(AuthContext);

  // useState hooks
  const [registerForm, setRegisterForm] = React.useState(registerFormInit);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  // onSubmit handler for login
  // if the user makes a request to login, create a
  // POST request that will send all the data collected
  // and in response, update auth data for the app's convenience
  const handleOnSubmitLogin = async(user) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login/`,
        {...user}
      );

      if(response){
        console.log("response login", response?.data);
        setAuth({email: user.email, loggedIn: true});
      }
    } catch (error) {
      console.error("Login error:", error); //debug
      // change useState message to make user aware of error
      setErrorMessage(error?.response?.data?.error?.message);
    }
  }
  // onSubmit handler for registration
  const handleOnSubmitRegistration = async(user) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register/`,{...user});

      if(response){
        console.log("response register:", response?.data);
        setAuth({email: user.email, loggedIn: true});
      }
    } catch (error) {
      console.error("Registration error:", error);
      // change useState message to make user aware of error
      setErrorMessage(error?.response?.data?.error?.message);
    }
  }

  //Log out handler
  const handleOnLogout = () => {
    //reset state to empty object
    setAuth({});
  }

  
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar handleOnLogout={handleOnLogout} auth={auth}/>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} setAuth={setAuth} auth={auth} handleOnSubmit={handleOnSubmitLogin}/>} />
            <Route path='/register' element={<RegistrationPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} setAuth={setAuth} auth={auth} handleOnSubmit={handleOnSubmitRegistration}/>} />
            <Route
              path='/activity'
              element={auth.loggedIn ?
                <ActivityPage auth={auth} />
                : <Navigate to='/login' />} />
            <Route
              path='/nutrition/*'
              element={auth.loggedIn ?
                <NutritionPage auth={auth}/>
                : <Navigate to='/login' />} />

            {/* {// TODO: render if user is logged in, otherwise, render AccessForbidden component*/}

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
