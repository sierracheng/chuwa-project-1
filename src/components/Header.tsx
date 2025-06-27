import { Link } from "react-router-dom";
import "./Layout.css";

/**
 * TODO:
 * 1. Add icons
 * 2. Link "Management" to the home page
 * 3. Link "Sign in" to the sign in page
 * 4. Implement Search bar
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-content-logo">
          <Link to="/home">
            <h1>Management</h1>
            <h4>Chuwa</h4>
          </Link>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="header-actions">
          <Link to="/signin" className="signin-button">
            Sign In
          </Link>
          <span className="cart-amount">$0.00</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
