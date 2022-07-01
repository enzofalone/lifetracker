import './RegistrationForm.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationForm(props) {
    const registrationFormInit = {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
    }

    const [registrationForm, setRegistrationForm] = React.useState(registrationFormInit);

    const onFormChange = (event) => {
        setRegistrationForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
        //reset error message as user is already making changes
        props.setErrorMessage();
    }

    return (
        <div className="registration-form form">
            {/* check if user is logged in */}
            {props.auth.loggedIn && (<Navigate to="/activity" replace={true}/>)}
            <h1>Register</h1>
            {/* error message if axios requests catch an error */}
            <p style={{color: 'red'}}>{props?.errorMessage}</p>
            {/* form fields */}
            <input name='email' placeholder='Email' value={registrationForm.email} onChange={onFormChange} required type='email' />
            <input name='username' placeholder='Username' value={registrationForm.username} onChange={onFormChange} required type='text' />
            <input name='firstName' placeholder='First Name' value={registrationForm.firstName} onChange={onFormChange} required type='text' />
            <input name='lastName' placeholder='Last Name' value={registrationForm.lastName} onChange={onFormChange} required type='text' />
            <input name='password' placeholder='Password' value={registrationForm.password} onChange={onFormChange} required type='password' />
            <input name='passwordConfirm' placeholder='Confirm Password' value={registrationForm.passwordConfirm} onChange={onFormChange} required type='password' />
            {/* submit button */}
            <button onClick={(e) => props.handleOnSubmit(registrationForm)} className='submit-registration form-button'>Create Account</button>
            {/* redirect button to /login */}
            <p>Already an user? <Link to='/login'>Log In</Link></p>
        </div>
    )
}