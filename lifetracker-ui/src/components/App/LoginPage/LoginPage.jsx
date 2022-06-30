import LoginForm from "../LoginForm/LoginForm";

export default function LoginPage() {
    let isUserLoggedIn = false;

    
    return (
        <div className="login-page">
            <div className="content">
                {isUserLoggedIn ? null : <LoginForm />}
            </div>
        </div>
    )
}