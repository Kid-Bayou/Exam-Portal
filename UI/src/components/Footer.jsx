import logo1 from "../assets/twitter.png"
import logo2 from "../assets/linkedin.png"
import logo3 from "../assets/instagram.png"
import logo4 from "../assets/facebook.png"

function Footer() {
  return (
    <footer>
      <div className="social-logo-container">
        <img src={logo1} className="social-logo"/>
        <img src={logo2} className="social-logo"/>
        <img src={logo3} className="social-logo"/>
        <img src={logo4} className="social-logo"/>
      </div>
    </footer>
  );
}

export default Footer;
