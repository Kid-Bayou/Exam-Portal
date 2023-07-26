import img1 from "../assets/classroom-img.jpg"
import img2 from "../assets/laptop-img.jpg"

function Home() {
    return (
        <>
            <div className="home-container">
                <h1 className="home-header">The Exam site for you</h1>
                <img src={img1} className="home-img-1" />
            </div>
        </>
    )
}

export default Home