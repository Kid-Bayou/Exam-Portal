import {Outlet} from "react-router-dom"
import ExamHeader from "./ExamHeader"
import ExamFooter from "./ExamFooter"

function ExamLayout() {
    return (
        <>
            <div className="site-wrapper">
                <ExamHeader />

                <main className="main">
                    <Outlet />
                </main>
                
                <ExamFooter />
            </div>
        </>
    )
}

export default ExamLayout;