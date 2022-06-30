import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import logo from "../../../../res/codepath_logo.svg"
import './Navbar.css'


export default function Navbar(props) {
    return (
        <div className="navbar">
            <div className="content">
                <Link className="logo" to='/'><img src={logo} ></img></Link>
                <NavLinks auth={props.auth} handleOnLogout={props.handleOnLogout} />
            </div>
        </div>
    )
}