import { Navigate } from "react-router-dom";

export default function ActivityPage(props) {
    // check if user is aunthenticated
    !props.auth.loggedIn && (<Navigate to='/login' replace={true}/>)
    
    return (
        
        <p>hello activity</p>
    )
}