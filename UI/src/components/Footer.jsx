import logo1 from "../assets/socials/twitter.png";
import logo2 from "../assets/socials/linkedin.png";
import logo3 from "../assets/socials/instagram.png";
import logo4 from "../assets/socials/facebook.png";

function Footer() {
  return (
    <footer>
      <div className="footer-content-conatiner">
        <p>
          Exam Portal
          
        </p>
        
      </div>
      <div className="line">
          <hr />
      </div>
      <div className="social-logo-container">
        <img src={logo1} className="social-logo" />
        <img src={logo2} className="social-logo" />
        <img src={logo3} className="social-logo" />
        <img src={logo4} className="social-logo" />
      </div>
        <div className="copyright-container">
          <p>© 2023 Exam Portal. All Rights Reserved</p>
        </div>
    </footer>
  );
}

export default Footer;
