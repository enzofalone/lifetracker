import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

// components
import Navbar from './Navbar/Navbar';
import LandingPage from './LandingPage/LandingPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
// import ActivityPage from './ActivityPage/ActivityPage';
// import NotFound from './NotFound/NotFound';

export default function App() {
  
  const registerFormInit = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: ''
  }

  const [registerForm, setRegisterForm] = React.useState(registerFormInit);


  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegistrationPage/>}/>
            {/* <Route path='/activity' element={<ActivityPage/>}/> */}
            {/* <Route path='/nutrition/*' element={<NutritionPage/>} 
            TODO: render if user is logged in, otherwise, render AccessForbidden component*/}
            {/* <Route path='*' element={<NotFound/>}/> */}
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
