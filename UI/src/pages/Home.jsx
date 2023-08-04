import img1 from "../assets/classroom-img.jpg"
import Pic from "../assets/HomeImg.jpg"

function Home() {
    return (
        <>
            <div className="home-container">
                <img src={Pic} className="home-img" />
                <h1 className="home-header">Your go to online exam site</h1>
            </div>
        </>
    )
}

export default Home