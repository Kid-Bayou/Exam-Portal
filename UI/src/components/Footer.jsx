import logo1 from "../assets/twitter.png";
import logo2 from "../assets/linkedin.png";
import logo3 from "../assets/instagram.png";
import logo4 from "../assets/facebook.png";

function Footer() {
  return (
    <footer>
      <div className="footer-content-conatiner">
        <p>
          Welcome to Exam Portal, where knowledge meets opportunity. We strive
          to empower learners of all ages by providing a seamless platform for
          exams and assessments. Our commitment to excellence drives us to
          deliver a user-friendly experience that fosters growth and
          achievement. Trust in our secure and reliable system, dedicated to
          maintaining the confidentiality of your data. Join us on this
          educational journey, as we unlock doors to a brighter future together.
          
        </p>
        
      </div>
      <div className="line">
        <p>
          <hr />
        </p>
      </div>
      <div className="social-logo-container">
        <img src={logo1} className="social-logo" />
        <img src={logo2} className="social-logo" />
        <img src={logo3} className="social-logo" />
        <img src={logo4} className="social-logo" />
      </div>
    </footer>
  );
}

export default Footer;
