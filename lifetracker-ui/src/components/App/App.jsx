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
  const { auth, setAuth } = React.useContext(AuthContext);

  React.useEffect(() => {
    //TODO
    // const {data,error} = await apiClient.get

    const fetchUser = async() => {
      const {data, error} = await apiClient.fetchUserFromToken();
      if(data) setAuth({...data, loggedIn: true});
      if(error) setErrorMessage(error);
    }

    const token = localStorage.getItem(apiClient.tokenName);
    if(token) {
      apiClient.setToken(token);
      fetchUser();
    }
  },[]);

  //Log out handler
  const handleOnLogout = () => {
    //reset state to empty object
    setAuth({});
    apiClient.setToken(null);
  }

  
  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar handleOnLogout={handleOnLogout} auth={auth}/>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} setAuth={setAuth} auth={auth}/>} />
            <Route path='/register' element={<RegistrationPage errorMessage={errorMessage} setErrorMessage={setErrorMessage} setAuth={setAuth} auth={auth} />} />
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
