import { Navigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage(props) {
    return (
        <div className="login-page">
            {user?.email && (<Navigate to="/activity" replace={true} />)}
            <div className="content">
                <LoginForm errorMessage={props.errorMessage} setErrorMessage={props.setErrorMessage} handleOnSubmit={props.handleOnSubmit}/>
            </div>
        </div>
    )
}