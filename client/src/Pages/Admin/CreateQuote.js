import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,  Link ,useParams } from 'react-router-dom';
import HeaderAdmin from '../../Components/HeaderAdmin';

export const CreateQuote = () =>{
    const [text, setText] = useState('');
    const [price, setprice] = useState(0);

    let { id } = useParams();
    const navigate = useNavigate()

    const manageChangeText = ({target}) =>{
        setText(target.value);
    }
    const manageChangePrice = ({target}) =>{
        setprice(target.value);
    }
    const createQuote = ()=>{
        const data = {
            userId: id,
            price: price,
            text: text
        }
        axios.post('http://localhost:5000/quote/create',data)
        .then(res => {
            // let user = res.data.user;
            alert('Preventivo creato con successo')
            navigate('/admin');           
        }).catch((e)=>{
            alert('errore')
        })
    }
      
    return (  
        <div>
            <HeaderAdmin/>
            <main className="container">
                <Link className="btn btn-success" to="/admin">INDIETRO</Link>       
                <h1 className="text-center pb-4">Crea Un PREVENTIVO</h1>

                <form >
                    <div className="form-group">
                        <label htmlFor="exampletext">TESTO</label>
                        <textarea onChange={manageChangeText}  type="email" className="form-control" id="exampletext"  placeholder="immetti il testo del preventivo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleprice">PREZZO</label>
                        <input onChange={manageChangePrice} type="number" className="form-control" id="exampleprice" placeholder="prezzo" />
                        {/* <div className="text-danger">
                            {error}
                        </div> */}
                    </div>
                    
                    <button type="button" onClick={createQuote} className="btn btn-primary">CREA</button>
                </form>
            </main>
        </div>
      );
}
export default CreateQuote;