import './RegistrationForm.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationForm() {
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
        
    }

    return (
        <div className="registration-form form">
            <h1>Register</h1>
            <input name='email' placeholder='Email' value={registrationForm.email} onChange={onFormChange} required type='email' />
            <input name='username' placeholder='Username' value={registrationForm.username} onChange={onFormChange} required type='text' />
            <input name='firstName' placeholder='First Name' value={registrationForm.firstName} onChange={onFormChange} required type='text' />
            <input name='lastName' placeholder='Last Name' value={registrationForm.lastName} onChange={onFormChange} required type='text' />
            <input name='password' placeholder='Password' value={registrationForm.password} onChange={onFormChange} required type='password' />
            <input name='passwordConfirm' placeholder='Confirm Password' value={registrationForm.passwordConfirm} onChange={onFormChange} required type='password' />
            <button className='submit-registration form-button'>Create Account</button>
            <p>Already an user? <Link to='/login'>Log In</Link></p>
        </div>
    )
}