import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, setIsLogin, setRole } from "../features/authenticate/authenticate";
import { logoutUser } from "../back-end/APITesting/Auth";
import { Link } from "react-router-dom";
import { icons } from "../constants/icons";
// import "./AuthButton.css"; 

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
        <div className="flex items-center gap-2">
        {isLogin ? (
            <button
            className="flex items-center text-white font-medium bg-transparent hover:text-purple-300 transition"
            onClick={handleLogout}
            >
            <span className="text-white text-xl mr-3">{icons.USER_CHECK}</span>
            <span className="hidden sm:inline">Log Out</span>
            </button>
        ) : (
            <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg border border-transparent px-4 py-2 text-base font-medium text-white bg-transparent cursor-pointer transition-colors duration-200 hover:text-purple-300"
            >
            <span className="text-white text-xl mr-3">{icons.USER}</span>
            <span className="hidden sm:inline">Log In</span>
            </Link>
        )}
        </div>
    )
};

export default AuthButton;