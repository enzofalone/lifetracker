import './LoginForm.css'

import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthProvider';
import apiClient from '../../../services/apiClient'

export default function LoginForm(props) {
    // useContext hook
    const { userContext } = React.useContext(AuthContext);
    const [ user, setUser ] = userContext;

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
        props.setErrorMessage();
    }

    const handleOnSubmit = async () => {
        const { data, error } = await apiClient.loginUser(loginForm);
        if (error) props.setErrorMessage(error);
        if (data?.user) {
            setUser(data.user);
            console.log('login form token received:', data.token);
            apiClient.setToken(data.token);
            
        }
    }

    return (
        <div className="login-form form">
            {/* {user?.email && (<Navigate to="/activity" replace={true} />)} */}
            <h1>Login</h1>
            <p style={{ color: 'red' }}>{props?.errorMessage}</p>
            <input name='email' placeholder='John@Doe.io' value={loginForm.email} onChange={onFormChange} required type='email' />
            <input name='password' placeholder='Password' value={loginForm.password} onChange={onFormChange} required type='password' />

            <button onClick={(e) => handleOnSubmit()} className='submit-login form-button'>Login</button>
            <p>New to LifeTracker? <Link to='/register'>Sign Up</Link></p>

        </div>
    )
}