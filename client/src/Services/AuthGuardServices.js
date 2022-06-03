import { Navigate } from "react-router-dom";

const Protected = ({children}) => {
    if (localStorage.getItem("userId") == null) {
        return <Navigate to="/login" replace />;
    }else{
        return children
    }
};
export default Protected;