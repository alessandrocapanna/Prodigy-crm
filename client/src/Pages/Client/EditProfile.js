import axios from "axios";
import {useState,useEffect} from "react"; 
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
export const EditProfile = () =>{

    const navigate = useNavigate()
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
            if (res.data.lastname!== null) {
                setLastname(res.data.lastname)
            }
            console.log(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    }
    useEffect(() => {
        callUserInfo()
      }, [])
    const manageChangEmail = ({target}) =>{
        setEmail( target.value);
    }
    const manageChangeName = ({target}) =>{
        setName( target.value);
    }
    const manageChangeLastName = ({target}) =>{
        setLastname( target.value);
    }
    const manageChangeImg = (event) =>{
        if (event.target.files && event.target.files[0]) {
              setImg(event.target.files[0]);
        }
        // console.log(URL.createObjectURL(event.target.files[0]));
    }    
    const manageChangeDocument =(event) =>{
        if (event.target.files && event.target.files[0]) {
              setDocument(event.target.files[0]);
        }
        // console.log(URL.createObjectURL(event.target.files[0]));
    }    
    const updateUser = ()=>{
        var bodyFormData = new FormData();
        console.log(img);
        const id = localStorage.getItem("userId")
       
     
        bodyFormData.append('id', id)
        bodyFormData.append('email', email)
        if (name !== '') {
            bodyFormData.append('name', name)
        }
        if (lastname !== '') {
            bodyFormData.append('lastname', lastname)
        }
        if (img !== '') {
            bodyFormData.append('image_path', img)
        }
        if (document !== '') {
            bodyFormData.append('document_path', document)
        }
        
        axios({
            method: "post",
            url: "http://localhost:5000/user/update",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
        .then(res => {
            alert('modifiche eseguite con successo')
            navigate('/profile');  
           console.log(res);         
        }).catch((e)=>{
            console.log(e.response);
        })
    }
    return (  
        <div>
            <Header/>
            <div className="container">

                <h3>MODIFICA PROFILO</h3>
                <form >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">EMAIL</label>
                        <input defaultValue={email} onChange={manageChangEmail}   type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Metti email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputNOME1">NOME</label>
                        <input defaultValue={name}  onChange={manageChangeName} type="text" className="form-control" id="exampleInputNOME1" placeholder="inserisci il nome" />
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputCOGNOME1">COGNOME</label>
                        <input defaultValue={lastname} onChange={manageChangeLastName} type="text" className="form-control" id="exampleInputCOGNOME1" placeholder="inserisci il cognomenome" />
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputIMG1">IMMAGINE DI PROFILO</label>
                        <input name='img_file' onChange={manageChangeImg}  type="file" className="form-control" id="exampleInputIMG1"  />
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputDocumento1">DOCUMENTO</label>
                        <input name='document_file' onChange={manageChangeDocument} type="file" className="form-control" id="exampleInputDocumento1"  />
                    
                    </div>
                    {/* <div className="text-danger">
                            {error}
                        </div> */}
                    <button onClick={updateUser}  type="button"  className="btn btn-primary">UPDATE</button>
                </form>
            </div>
        </div>
      );
}
export default EditProfile;