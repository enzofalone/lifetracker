import RegistrationForm from '../RegistrationForm/RegistrationForm';

export default function RegistrationPage(props) {
    return (
        <div className="registration-page">
            <div className="content">
                <RegistrationForm errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} setAuth={props.setAuth} auth={props.auth} handleOnSubmit={props.handleOnSubmit}/>
            </div>
        </div>
    )    
}