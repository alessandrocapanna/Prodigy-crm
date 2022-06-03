import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({children}) => {
    if (localStorage.getItem("admin") !== 'true') {
        return <Navigate to="/adminlogin" replace />;
    }else{
        return children
    }
};
export default ProtectedAdmin;