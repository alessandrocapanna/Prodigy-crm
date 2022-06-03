import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Header = () =>{
    const navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem("userId");
        navigate('/login');
    }
    return (  
        <nav className="navbar navbar-dark bg-dark">
            <Link className="nav-item text-light" to="/">HOME</Link>
            <Link className="nav-item text-light" to="/profile">IL TUO PROFILO</Link>
            <button onClick={logOut}> LOG-OUT</button>
        </nav>
      );
}
export default Header;