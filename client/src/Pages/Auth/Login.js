import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () =>{
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
    const loginUser = ()=>{
        const data = {
            password: pass,
            email: email
        }
        
        axios.post('http://localhost:5000/user/login',data)
        .then(res => {
            let user = res.data.user;
            localStorage.setItem("userId",user.id);
            navigate('/');           
        }).catch((e)=>{
            setError(e.response.data.error)
        })
    }
      
    return (  
        <main className="container">
            <h1 className="text-center pb-4">Effettua il login</h1>

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
                
                <button type="button" onClick={loginUser} className="btn btn-primary">Login</button>
            </form>
        </main>
      );
}
export default Login;