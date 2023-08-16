import {Link, NavLink} from "react-router-dom"
import logo from "../assets/logo.png"

function Header() {
    return (
        <>
            <header className="main-header">
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

                    <NavLink to="/login">
                        Login
                    </NavLink>
                </nav>
            </header>
        </>
    )
}

export default Header