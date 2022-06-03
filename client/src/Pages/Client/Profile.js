import axios from "axios";
import {useState,useEffect} from "react"; 
import Header from "../../Components/Header";
import { Link } from "react-router-dom";
export const Profile = () =>{
    // const [profile, setProfile] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [img, setImg] = useState('');
    const [document, setDocument] = useState(''); 

    const id = localStorage.getItem("userId")
    const callUserInfo = async ()=>{
        await axios.post('http://localhost:5000/user/getuser',{id:id})
        .then(res => {
            setEmail(res.data.email)
            if (res.data.name!== null) {
                setName(res.data.name)
            }
            if (res.data.lastaname!== null) {
                setLastname(res.data.lastaname)
            }
            if (res.data.image_path!== null) {
                setImg(res.data.image_path)
            }
            if (res.data.document_path!== null) {
                setDocument(res.data.document_path)
            }
            console.log(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callUserInfo()
      }, [])
  
    return (  
        <div>
            <Header/>
            <div className="container">
                <h1 className="text-center">PROFILO</h1>
                
            
                <div className="text-center pb-4">
                    <h5>INFO</h5>
                    <ul className="list-group">
                        <li className="list-group-item">email : {email}</li>
                        <li className="list-group-item">nome : {name}</li>
                        <li className="list-group-item">cognome : {lastname}</li>
                    </ul>
                </div>
                
                <div className="text-center">
                <p>LA TUA IMMAGINE</p>
                </div>
                <div className="text-center  pb-4">
                    <img className='my_pictures'  src={'http://localhost:5000'+img}/>
                </div>
                <div className="text-center">
                <p>IL TUO DOCUMENTO</p>
                </div>
                <div className="text-center">
                    <img className='my_document'  src={'http://localhost:5000'+document}/>
                </div>
                <div className="text-center  pb-4 pt-4">
                <Link className="btn btn-primary" to="/editprofile">MODIFICA IL TUO PROFILO</Link>        
                </div>
            </div>
        </div>
      );
}
export default Profile;