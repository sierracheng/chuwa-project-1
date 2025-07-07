import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, setIsLogin, setRole } from "../features/authenticate/authenticate";
import { logoutUser } from "../back-end/APITesting/Auth";
import { Link } from "react-router-dom";
import { icons } from "../constants/icons";
import "./AuthButton.css"; // Assuming you have a CSS file for styling the AuthButton component

/**
 * AuthButton component handles user authentication state.
 * It displays a login button if the user is not logged in,
 * and a logout button if the user is logged in.
 */

const AuthButton = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin);

    const handleLogout = () =>{
        logoutUser();
        dispatch(setIsLogin(false));
        dispatch(setRole(''));
    }

    return (
        <div className="header-user">
            {isLogin ? (
                <button className="logout-button" onClick={handleLogout}>
                    <div className="icon">{icons.USER_CHECK}</div>
                    <div>Log Out</div>
                </button>
            ) : (
                <Link to="/login" className="signin-button">
                    <div className="icon">{icons.USER}</div>
                    <div>Log In</div>
                </Link>
            )}
        </div>
    )
};

export default AuthButton;