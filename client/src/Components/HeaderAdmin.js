import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const HeaderAdmin = () =>{
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("admin");
        navigate('/adminlogin');
    }
    return (  
        <nav className="navbar navbar-dark bg-dark">
            <Link className="nav-item text-light" to="/admin">HOME</Link>
  
            <button onClick={logOut}> LOG-OUT</button>
        </nav>
      );
}
export default HeaderAdmin;