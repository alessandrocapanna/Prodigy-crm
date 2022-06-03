import axios from "axios";
import {useState, useEffect} from "react"; 
import { Link ,useParams} from "react-router-dom";
import HeaderAdmin from "../../Components/HeaderAdmin";

export const Offer = () =>{
    const [offer, setOffer] = useState([]);
    const [usersOffer, setUsersOffer] = useState([]);
    let { id } = useParams();
    const callApiOffer = async ()=>{
        await axios.post('http://localhost:5000/offer/getbyid',{id:id})
        .then(res => {
            setUsersOffer(res.data.Users); 
            setOffer(res.data)  
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callApiOffer()
        }, [])
    return (  
        <div>
            <HeaderAdmin/>
            <Link className="btn btn-success" to="/admin">INDIETRO</Link>       
            <h3 className="text-center">DETTAGLI OFFERTA</h3>

            <h4>SCONTO DI {offer.price}€ </h4>
            <p>TESTO OFFERA: {offer.text}</p>
            
            <h4>DETTAGLI VALIDA PER </h4>
            
            <ul>
            {usersOffer.map((user)=>
                    <li key={user.id} className="pb-2">
                        EMAIL: {user.email} | ID: {user.id} 
                    </li>
                )}
            </ul>

            
            
            
        </div>
      );
}
export default Offer;