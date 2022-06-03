import axios from "axios";
import {useState, useEffect} from "react"; 
import { Link ,useParams} from "react-router-dom";
import HeaderAdmin from "../../Components/HeaderAdmin";

export const Client = () =>{
    const [quotes, setQuotes] = useState([]);
    const [emails, setEmails] = useState([]);

    let { id } = useParams();
    const callApiQuotes = async ()=>{
        await axios.post('http://localhost:5000/quote/getbyuser',{userId:id})
        .then(res => {
            setQuotes(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    const callApiEmails = async ()=>{
        await axios.post('http://localhost:5000/email/getbyuser',{userId:id})
        .then(res => {
            setEmails(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callApiQuotes();
        callApiEmails();
        }, [])
    return (  
        <div>
            <HeaderAdmin/>
            <Link className="btn btn-success" to="/admin">INDIETRO</Link>       
            <h3>PREVENTIVI</h3>
            <ul>
                {quotes.map((quote)=>
                    <li key={quote.id} className="pb-2">
                        -TESTO: {quote.text} <br/>-PREZZO: {quote.price}€
                    </li>
                )}
            </ul>
            <Link className="btn btn-primary" to={"/admin/"+id+'/creapreventivo'}>CREA PREVENTIVO</Link>       
            <h3>EMAIL RICEVUTE</h3>
            <ul>
                {emails.map((email)=>
                    <li key={email.id} className="pb-2">
                        TITOLO: {email.title} | SOTTOTITOLO: {email.subtitle} <br/> {email.text}
                    </li>
                )}
            </ul>
           

            
            
        </div>
      );
}
export default Client;