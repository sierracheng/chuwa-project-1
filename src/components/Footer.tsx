import { Link } from "react-router-dom";
import "./Layout.css";
import { icons } from "../constants/icons";

/**
 * TODO:
 * 1. Change icon to correct colors and shapes
 * 2. Adjust css if needed
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>©{new Date().getFullYear()} All Rights Reserved.</div>
        <div>
          {icons.YOUTUBE_WHITE}
          {icons.TWITTER_WHITE}
          {icons.FACEBOOK_WHITE}
        </div>
        <div className="footer-infos">
          <Link to="/">Contact us</Link>
          <Link to="/">Privacy Policies</Link>
          <Link to="/">Help</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
