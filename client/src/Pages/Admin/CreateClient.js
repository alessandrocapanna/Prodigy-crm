import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,  Link } from 'react-router-dom';
import HeaderAdmin from '../../Components/HeaderAdmin';

export const CreateClient = () =>{
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const manageChangePass = ({target}) =>{
        setPass(target.value);
    }
    const manageChangeEmail = ({target}) =>{
        setEmail(target.value);
    }
    const createClient = ()=>{
        const data = {
            password: pass,
            email: email
        }
        
        axios.post('http://localhost:5000/user/register',data)
        .then(res => {
            let user = res.data.user;
            alert('Cliente creato con successo')
            navigate('/admin');           
        }).catch((e)=>{
            alert('errore')

            setError(e.response.data.error)
        })
    }
      
    return (  
        <div>
            <HeaderAdmin/>
            <main className="container">
                <Link className="btn btn-success" to="/admin">INDIETRO</Link>       
                <h1 className="text-center pb-4">Crea Un Cliente</h1>

                <form >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input onChange={manageChangeEmail}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Metti email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={manageChangePass} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        <div className="text-danger">
                            {error}
                        </div>
                    </div>
                    
                    <button type="button" onClick={createClient} className="btn btn-primary">CREA</button>
                </form>
            </main>
        </div>
      );
}
export default CreateClient;