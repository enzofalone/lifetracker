import './LoginForm.css'

import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthProvider';

export default function LoginForm(props) {
      // AuthContext
    const { auth, setAuth } = React.useContext(AuthContext);

    const loginFormInit = {
        email: '',
        password: ''
    }

    const [loginForm, setLoginForm] = React.useState(loginFormInit);

    const onFormChange = (event) => {
        setLoginForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
    }

    return (
        
        <div className="login-form form">
            {auth.loggedIn && (<Navigate to="/activity" replace={true}/>)}
            <h1>Login</h1>
            <p style={{color: 'red'}}>{props?.errorMessage}</p>
            <input name='email' placeholder='John@Doe.io' value={loginForm.email} onChange={onFormChange} required type='email' />
            <input name='password' placeholder='Password' value={loginForm.password} onChange={onFormChange} required type='password' />

            <button onClick={(e) => props.handleOnSubmit(loginForm)} className='submit-login form-button'>Login</button>
            <p>New to LifeTracker? <Link to='/register'>Sign Up</Link></p>

        </div>
    )
}