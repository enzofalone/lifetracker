import './RegistrationForm.css';
import * as React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import AuthContext from '../../../contexts/auth';
import apiClient from '../../../services/apiClient'

export default function RegistrationForm(props) {
    const registrationFormInit = {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
    }

    // useContext hook
    const { userContext } = React.useContext(AuthContext);
    const [user, setUser] = userContext;
    const [registrationForm, setRegistrationForm] = React.useState(registrationFormInit);

    // reset error message on mount
    React.useEffect(() => {
        props.setErrorMessage();
    }, [])

    const onFormChange = (event) => {
        setRegistrationForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
        //reset error message as user is already making changes
        props.setErrorMessage();
    }

    const handleOnSubmit = async () => {
        // if passwords do not match, return before doing request
        if(registrationForm.password !== registrationForm.passwordConfirm) {
            props.setErrorMessage("Passwords do not match!")
            return 0;
        }
        // create request
        const { data, error } = await apiClient.signupUser(registrationForm);
        if (error) props.setErrorMessage(error)
        if (data?.user) {
            setUser(data?.user);
            apiClient.setToken(data.token)
        }
    }

    return (
        <div className="registration-form form">
            {/* check if user is logged in */}
            {user?.email && (<Navigate to="/activity" replace={true} />)}
            <h1>Register</h1>
            {/* error message if axios requests catch an error */}
            <p style={{ color: 'red' }}>{props?.errorMessage}</p>
            {/* form fields */}
            <label className='form-label' htmlFor='email'>Email</label>
            <input className='form-input' name='email' placeholder='Email' value={registrationForm.email} onChange={onFormChange} required type='email' />
            <label className='form-label' htmlFor='username'>Username</label>
            <input className='form-input' name='username' placeholder='Username' value={registrationForm.username} onChange={onFormChange} required type='text' />
            <div className="form-division">
                <div>
                <label className='form-label' htmlFor='first-name'>First Name</label>
                <input className='form-input' name='firstName' placeholder='First Name' value={registrationForm.firstName} onChange={onFormChange} required type='text' />
                </div>
                <div>
                <label className='form-label' htmlFor='lastName'>Last Name</label>
                <input className='form-input' name='lastName' placeholder='Last Name' value={registrationForm.lastName} onChange={onFormChange} required type='text' />
                </div>
            </div>
            <label className='form-label' htmlFor='password'>Password</label>
            <input className='form-input' name='password' placeholder='Password' value={registrationForm.password} onChange={onFormChange} required type='password' />
            <label className='form-label' htmlFor='re-password'>Confirm Password</label>
            <input className='form-input' name='passwordConfirm' placeholder='Confirm Password' value={registrationForm.passwordConfirm} onChange={onFormChange} required type='password' />
            {/* submit button */}
            <button onClick={(e) => handleOnSubmit()} className='submit-registration form-button'>Create Account</button>
            {/* redirect button to /login */}
            <p>Already an user? <Link to='/login'>Log In</Link></p>
        </div>
    )
}