import Pic from "../assets/imgs/HomeImg.jpg";

function Home() {
  return (
    <>
      <div className="home-container">
        <img src={Pic} className="home-img" />
        <div className="home-text-container">
          <h1 className="home-header">Your go to online exam site</h1>
          <p className="home-content">
            Discover Exam Portal: Your path to knowledge and opportunity. Our
            user-friendly platform empowers learners, ensuring growth through
            seamless exams and assessments. Count on our secure system to
            safeguard your data and join us on this educational journey towards
            a brighter future.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
