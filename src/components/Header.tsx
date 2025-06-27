import { Link } from "react-router-dom";
import "./Layout.css";
import { icons } from "../constants/icons";


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
        {/* mobile version */}
        <div className = "header-mobile">
        <div className="header-top-mobile">
          <div className="header-content-logo">
            <Link to="/home">
              {/*Desktop*/}
              <div className="logo-desktop">
                <h1 className="management-title">Management</h1>
                <h5 className="chuwa-subtitle">Chuwa</h5>
              </div>
              {/*Mobile*/}
              <div className="logo-mobile">
                <h1 className="management-title">M</h1>
                <h5 className="chuwa-subtitle">Chuwa</h5>
              </div>
            </Link>
          </div>
          <div className="header-actions">
            <div className="header-user">
              {icons.USER}
              <Link to="/signin" className="signin-button">
                Sign In
              </Link>
            </div>
            <button className='cart-button'>
              {icons.CART}
              <span className="cart-amount">$0.00</span>
            </button>
          </div>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search" className="search-input" />
          <button className='search-button' type='button'>
            {icons.SEARCH}
          </button>
        </div>
        </div>

        {/* desktop version */}
        <div className = "header-desktop">
          <div className="header-content-logo">
            <Link to="/home">
              {/*Desktop*/}
              <div className="logo-desktop">
                <h1 className="management-title">Management</h1>
                <h5 className="chuwa-subtitle">Chuwa</h5>
              </div>
              {/*Mobile*/}
              <div className="logo-mobile">
                <h1 className="management-title">M</h1>
                <h5 className="chuwa-subtitle">Chuwa</h5>
              </div>
            </Link>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Search" className="search-input" />
            <button className='search-button' type='button'>
              {icons.SEARCH}
            </button>
          </div>
          <div className="header-actions">
          <div className="header-user">
            {icons.USER}
            <Link to="/signin" className="signin-button">
              Sign In
            </Link>
          </div>
          <button className='cart-button'>
            {icons.CART}
            <span className="cart-amount">$0.00</span>
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
