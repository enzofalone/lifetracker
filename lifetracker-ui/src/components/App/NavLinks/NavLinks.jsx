import { Link } from "react-router-dom";

import './NavLinks.css'

export default function NavLinks() {
    let isLoggedIn = false;

    return (
        <div className='nav-links'>
            <Link to='/activity'>Activity</Link>
            <Link to='/nutrition'>Nutrition</Link>
            
            {(isLoggedIn === false ? <Link to='/login' className="button-filled">Login</Link> : <Link to='/'>Logout</Link>)}
            {(isLoggedIn === false ? <Link to='/register' className="button-filled">Register</Link> : null)}
            
        </div>
    )
}