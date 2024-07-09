import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"

const LogoutAuth = ({ children }) => {

    const { userToken } = useSelector((state) => state.Auth);
    console.log(userToken)
    return (
        userToken ? < Navigate to={'/'} /> : children
    )
}

export default LogoutAuth