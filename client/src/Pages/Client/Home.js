import axios from "axios";
import {useState,useEffect} from "react"; 
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
export const Home = () =>{
    const [quotes, setQuotes] = useState([]);
    const [offers, setOffers] = useState([]);
    const id = localStorage.getItem("userId")
    // console.log(id);
    const callQuotesInfo = async ()=>{
        await axios.post('http://localhost:5000/quote/getbyuser',{userId:id})
        .then(res => {
           setQuotes(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    const callOffersInfo = async ()=>{
        await axios.post('http://localhost:5000/offer/getbyuserid',{userId:id})
        .then(res => {
            setOffers(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callQuotesInfo();
        callOffersInfo();
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
                {offers.map((offer)=>
                    <li key={offer.OfferId} >
                        TESTO: {offer.Offer.text} | PREZZO: {offer.Offer.price}€
                    </li>
                )}
            </ul>
            <Link to="/email" className="btn btn-primary" >INVIA UNA RICHIESTA</Link>
            
        </div>
      );
}
export default Home;