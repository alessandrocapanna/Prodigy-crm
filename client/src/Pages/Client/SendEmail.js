import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';

export const SendEmail = () =>{
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [text, setText] = useState('');

    const navigate = useNavigate()

    const id = localStorage.getItem("userId")

    const manageChangeTitle = ({target}) =>{
        setTitle(target.value);
    }
    const manageChangeSubTitle = ({target}) =>{
        setSubtitle(target.value);
    }
    const manageChangeText = ({target}) =>{
        setText(target.value);
    }
    const sendEmail = ()=>{
        const data = {
            UserId: id,
            text: text,
            subtitle:subtitle,
            title:title,
        }
        
        axios.post('http://localhost:5000/email/sendemail',data)
        .then(res => {
            alert('email inviata con successo')
            navigate('/');           
        }).catch((e)=>{
            console.log(e);
        })
    }
      
    return ( 
        <div>
            <Header/> 
            <main className="container">
                <h1 className="text-center pb-4">Invia EMAIL PREVENTIVO</h1>

                <form >
                    <div className="form-group">
                        <label htmlFor="title">TITOLO</label>
                        <input onChange={manageChangeTitle}  type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Metti email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subtitle">SOTTOTITOLO</label>
                        <input onChange={manageChangeSubTitle}  type="text" className="form-control" id="subtitle" aria-describedby="emailHelp" placeholder="Metti email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">TESTO</label>
                        <input onChange={manageChangeText}  type="text" className="form-control" id="text" aria-describedby="emailHelp" placeholder="Metti email" />
                    </div>
                    
                    <button type="button" onClick={sendEmail} className="btn btn-primary">Invia</button>
                </form>
            </main>
        </div> 
      );
}
export default SendEmail;