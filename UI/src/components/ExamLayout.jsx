import {Outlet} from "react-router-dom"
import Header from "./Header"
import  Footer from "./Footer"

function ExamLayout() {
    return (
        <>
            <div className="site-wrapper">
                <Header />

                <main className="main">
                    <Outlet />
                </main>
                
                <Footer />
            </div>
        </>
    )
}

export default ExamLayout;