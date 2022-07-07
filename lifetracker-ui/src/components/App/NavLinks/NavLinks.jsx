import { NavLink } from "react-router-dom";

import './NavLinks.css'

export default function NavLinks(props) {

    const handleOnClickLogout = () => {
        props.handleOnLogout();
    }

    return (
        <div className='nav-links'>
            <NavLink className=
                        {isActive => 'nav-link' + (!isActive ? ' unselected' : '')} to='/activity'>Activity</NavLink>
            <NavLink className=
                        {isActive => 'nav-link' + (!isActive ? ' unselected' : '')} to='/nutrition'>Nutrition</NavLink>
            <NavLink className=
                        {isActive => 'nav-link' + (!isActive ? ' unselected' : '')} to='/exercise'>Exercise</NavLink>


            {(!props?.user?.email ? 
                <NavLink 
                    className=
                        {isActive => 'nav-link' + (!isActive ? ' unselected' : '')} to='/login'>Login</NavLink>
                : <NavLink to='/' className=
                        {isActive => 'nav-link button-filled' + (!isActive ? ' unselected' : '')} 
                        onClick={(e) => handleOnClickLogout()}>
                            Logout
                        </NavLink>)}
            {(!props?.user?.email ? 
                <NavLink className={isActive => 'nav-link button-filled' + (!isActive ? ' unselected' : '')} 
                to='/register'>
                    Sign Up
                </NavLink> : null)}
            
        </div>
    )
}