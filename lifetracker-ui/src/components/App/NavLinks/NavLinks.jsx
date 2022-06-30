import { NavLink } from "react-router-dom";

import './NavLinks.css'

export default function NavLinks() {
    let isLoggedIn = false;

    return (
        <div className='nav-links'>
            <NavLink to='/activity'>Activity</NavLink>
            <NavLink to='/nutrition'>Nutrition</NavLink>
            
            {(isLoggedIn === false ? <NavLink to='/login' className="button-filled">Login</NavLink> : <NavLink to='/'>Logout</NavLink>)}
            {(isLoggedIn === false ? <NavLink to='/register' className="button-filled">Register</NavLink> : null)}
            
        </div>
    )
}