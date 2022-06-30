import { NavLink } from "react-router-dom";

import './NavLinks.css'

export default function NavLinks(props) {

    const handleOnClickLogout = () => {
        props.handleOnLogout();
    }
    console.log(props?.auth);
    return (
        <div className='nav-links'>
            <NavLink to='/activity'>Activity</NavLink>
            <NavLink to='/nutrition'>Nutrition</NavLink>
            
            {(!props?.auth?.loggedIn ? <NavLink to='/login' className="button-filled">Login</NavLink> : <NavLink to='/' onClick={(e) => handleOnClickLogout()}>Logout</NavLink>)}
            {(!props?.auth?.loggedIn ? <NavLink to='/register' className="button-filled">Register</NavLink> : null)}
            
        </div>
    )
}