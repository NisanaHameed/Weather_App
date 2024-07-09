import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
import Home from "../Pages/Home";

const LoginAuth = ({ children }) => {

    const { userToken } = useSelector((state) => state.Auth);
    console.log(userToken)
    return (
        userToken ? children : < Navigate to={'/login'} />
    )
}

export default LoginAuth
