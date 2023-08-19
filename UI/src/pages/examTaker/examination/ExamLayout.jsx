import {Outlet} from "react-router-dom"
import ExamHeader from "./ExamHeader"
import ExamFooter from "./ExamFooter"
import "../../../styles/Examination.css"

function ExamLayout() {
    return (
        <>
            <div className="examination-wrapper">
                <ExamHeader />

                <main className="examination-main">
                    <Outlet />
                </main>
                
                <ExamFooter />
            </div>
        </>
    )
}

export default ExamLayout;