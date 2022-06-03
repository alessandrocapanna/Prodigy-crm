import axios from "axios";
import { useState ,useEffect} from "react"; 
import { Link } from "react-router-dom";
import HeaderAdmin from "../../Components/HeaderAdmin";
export const AdminHome = () =>{
    const [users, setUsers] = useState([]);
    const [offers, setOffers] = useState([]);
   
    const callUsersInfo = async ()=>{
        await axios.get('http://localhost:5000/user')
        .then(res => {
            setUsers(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    const callOffers = async ()=>{
        await axios.get('http://localhost:5000/offer')
        .then(res => {
            setOffers(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callUsersInfo();
        callOffers();
      }, [])
    return (  
        <div>
            <HeaderAdmin/>
            
                

            <h3>CLIENTI <Link className="btn btn-primary ml-4" to="/admin/createclient">CREA CLIENTE</Link></h3>
            <ul className="pb-4">
                {users.map((user)=>
                    <li key={user.id} className="pb-2">
                        EMAIL: {user.email} | {user.admin ? 'ADMIN' : 'CLIENTE'} | <Link className="btn btn-primary" to={"/admin/cliente/"+user.id}>INFO</Link>
                    </li>
                )}
            </ul>

            <h3 className="pt-4">OFFERTE CREATE <Link className="btn btn-success ml-4" to='/admin/creaofferta'>CREA OFFERTA</Link>   </h3>
            <ul>
                {offers.map((offer)=>
                    <li key={offer.id} className="pb-2">
                        SCONTO: {offer.price} | {offer.text } | <Link className="btn btn-primary" to={"/admin/offer/"+offer.id}>INFO</Link>
                    </li>
                )}
            </ul>
          
            
        </div>
      );
}
export default AdminHome;