import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage(props) {
    return (
        <div className="login-page">
            <div className="content">
                <LoginForm setAuth={props.setAuth} auth={props.auth} errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} handleOnSubmit={props.handleOnSubmit}/>
            </div>
        </div>
    )
}