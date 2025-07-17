import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/authenticate/authenticate";

const ProtectedRoute = () => {
    const isLogin = useSelector(selectIsLogin);

    if (!isLogin) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
