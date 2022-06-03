import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,  Link ,useParams } from 'react-router-dom';
import HeaderAdmin from '../../Components/HeaderAdmin';

export const CreateOffer = () =>{
    const [text, setText] = useState('');
    const [price, setprice] = useState(0);
    const [usersToOffer, setUsersToOffer] = useState([]);

    const [users, setUsers] = useState([]);


    const navigate = useNavigate()

    const manageChangeText = ({target}) =>{
        setText(target.value);
    }
    const manageChangePrice = ({target}) =>{
        setprice(target.value);
    }
    const manageChangeUsers = ({target}) =>{
        let updatedListUsers = [...usersToOffer];
        if (target.checked) {
            updatedListUsers = [...usersToOffer, target.value];
        }else{
            updatedListUsers.splice(usersToOffer.indexOf(target.value), 1);
        }
        setUsersToOffer(updatedListUsers);


       
    }
    const createOffer = ()=>{
        console.log(usersToOffer);
        const data = {
            usersId:usersToOffer,
            price: price,
            text: text
        }
        axios.post('http://localhost:5000/offer/create',data)
        .then(res => {
            // let user = res.data.user;
            alert('OFFERTA creata con successo')
            navigate('/admin');           
        }).catch((e)=>{
            alert('errore')
        })
    }
    const callUsersInfo = async ()=>{
        await axios.get('http://localhost:5000/user')
        .then(res => {
            setUsers(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callUsersInfo()
      }, [])
    return (  
        <div>
            <HeaderAdmin/>
            <main className="container">
                <Link className="btn btn-success" to="/admin">INDIETRO</Link>       
                <h1 className="text-center pb-4">CREA OFFERTA</h1>

                <form >
                    <div className="form-group">
                            <h4>UTENTI BENEFICIARI</h4>
                            {users.map((user)=>
                                    <div className="form-check pb-2" key={user.id} >
                                        <input onChange={manageChangeUsers} className="form-check-input" type="checkbox" value={user.id} id={"flexCheckDefault"+user.id}/>
                                        <label className="form-check-label" htmlFor={"flexCheckDefault"+user.id}>
                                            {user.email}
                                        </label>
                                      
                                    </div>
                            )}
                    

                           
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampletext">TESTO</label>
                        <textarea onChange={manageChangeText}  type="email" className="form-control" id="exampletext"  placeholder="immetti il testo del dell'offerta" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleprice">SCONTO SOLDI</label>
                        <input onChange={manageChangePrice} type="number" className="form-control" id="exampleprice" placeholder="INSERISCI IL VALORE DELLO SCONTO IN €" />
                        {/* <div className="text-danger">
                            {error}
                        </div> */}
                    </div>
                    
                    <button type="button" onClick={createOffer} className="btn btn-primary">CREA</button>
                </form>
            </main>
        </div>
      );
}
export default CreateOffer;