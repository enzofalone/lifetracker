import * as React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"

// components
import Navbar from './Navbar/Navbar';
import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import ActivityPage from './ActivityPage/ActivityPage';
import NutritionPage from './NutritionPage/NutritionPage';
import NotFound from './NotFound/NotFound';

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

  const [registerForm, setRegisterForm] = React.useState(registerFormInit);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const notLoggedInHandler = () => {
    setErrorMessage("You must be logged in to access that page");
    return (
      <Navigate to='/login' />
    )
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage errorMessage={errorMessage} />} />
            <Route path='/register' element={<RegistrationPage />} />
            <Route
              path='/activity'
              element={isLoggedIn ?
                <ActivityPage />
                : <Navigate to='/login' />} />
            <Route
              path='/nutrition/*'
              element={isLoggedIn ?
                <NutritionPage />
                : <Navigate to='/login' />} />

            {/* {// TODO: render if user is logged in, otherwise, render AccessForbidden component*/}

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
