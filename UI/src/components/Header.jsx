import {Link, NavLink} from "react-router-dom"
import logo from "../assets/logo.png"

function Header() {
    return (
        <>
            <header className="shadow-md flex py-4">
                <Link className="site-logo" to="/">
                    <img src={logo} className="h-16 p-0 ml-3" />
                    <p className="p-0 font-bold text-2xl mt-5 ml-3" >Exam Portal</p>
                </Link>
                <nav>
                    <NavLink to="/courses">
                        Courses
                    </NavLink>

                    <NavLink to="/about">
                        About
                    </NavLink>
                </nav>
            </header>
        </>
    )
}

export default Header