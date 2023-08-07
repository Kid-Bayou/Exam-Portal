import {Link, NavLink} from "react-router-dom"
import logo from "../assets/logo.png"

function Header() {
    return (
        <>
            <header>
                <Link className="site-logo" to="/">
                    <img src={logo} className="logo" />
                    <p className="logo-name">Exam Portal</p>
                </Link>
                <nav className="nav">
                    <NavLink to="/courses">
                        Courses
                    </NavLink>

                    <NavLink to="/about">
                        About
                    </NavLink>

                    <NavLink to="/signup">
                        Sign Up
                    </NavLink>
                </nav>
            </header>
        </>
    )
}

export default Header