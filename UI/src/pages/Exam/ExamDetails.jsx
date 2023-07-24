import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"

function ExamDetail(){
    const params = useParams()
    const [exam, setExam] = useState(null)

    useEffect(() => {
        fetch(`/api/exam/${params.id}`)
            .then(res => res.json())
            .then(data => setExam(data.exam))
    }, [params.id])

    return (
        <div className="exam-detail-container">
            {exam ? (
                <div className="exam-detail">
                    <p>{exam.description}</p>
                </div>
            ) : <h2>Loading</h2>}
        </div>
    )
}

export default ExamDetail