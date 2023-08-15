import image from "../assets/imgs/about-exam.jpg"

function About() {
  return (
    <>
      <div className="about-page-container">
          <h1 className="about-header">About</h1>
        <div className="about-page-content">
          <img src={image} className="about-image" />
          <p className="about-paragraph">
            Discover our site! Welcome to a world of online exams
            reimagined for learners worldwide. We offer a diverse range of
            exams, adaptive testing, and robust security measures, ensuring a
            seamless and fair assessment experience. Join us now to uncover new
            opportunities and reach your goals!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
