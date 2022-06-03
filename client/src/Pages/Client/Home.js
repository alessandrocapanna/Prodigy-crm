import axios from "axios";
import {useState,useEffect} from "react"; 
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
export const Home = () =>{
    const [quotes, setQuotes] = useState([]);
    const id = localStorage.getItem("userId")
    // console.log(id);
    const callUsersInfo = async ()=>{
        await axios.post('http://localhost:5000/quote/getbyuser',{userId:id})
        .then(res => {
           setQuotes(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callUsersInfo();
    
      }, [])
    return (  
        <div>
            <Header/>
            <h3>PREVENTIVI</h3>
            <ul>
                {quotes.map((quote)=>
                    <li key={quote.id} >
                        TESTO: {quote.text} | PREZZO: {quote.price}€
                    </li>
                )}
            </ul>
            <h3>OFFERTE</h3>
            <ul>
                {quotes.map((quote)=>
                    <li key={quote.id} >
                        TESTO: {quote.text} | PREZZO: {quote.price}€
                    </li>
                )}
            </ul>
            <Link to="/email" >INVIA UNA RICHIESTA</Link>
            
        </div>
      );
}
export default Home;