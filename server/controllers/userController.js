const Users =require("../models").Users;
const fs = require('fs');

//getall
async function getUsers(){
    return Users.findAll({
        attributes: ['id','name','email','admin','image_path','document_path']
      }
    );
};
//getOneByMAil
async function getUserByMail(email){
    const user = Users.findOne({where:{ email: email }})
    console.log(user);
    if (user === null) {
        return user;
      } else {
        return user;
      }
};
//getOneById
async function getUserById(id){
  const user = Users.findOne({where:{ id: id }})
  console.log(user);
  if (user === null) {
      return user;
    } else {
      return user;
    }
};

//create
async function createUser(data){

    if (!(data.email && data.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }
    Users.create({name:data.name,lastName:data.lastName,email:data.email,password:data.password,admin:false});
   
    return 'CREATO CON SUCCESSO';
};

//update
async function updateUser(files,body){
  const user = getUserById(body.id);
  var  pathStorageImg =user.image_path;
  // console.log(files.document.path);
  if(files.image_path !== undefined){
    var tempFilePathImg = files.image_path.path;
    var   userFileNameImg  = files.image_path.name;
    pathStorageImg = './uploads/images/'+body.id+'/'+userFileNameImg;
    if (!fs.existsSync('./uploads/images/'+body.id)){
        fs.mkdirSync('./uploads/images/'+body.id);
    }
    fs.writeFileSync(pathStorageImg, fs.readFileSync(tempFilePathImg))
    pathStorageImg = pathStorageImg.substring(1)
    console.log(pathStorageImg);
  }

  var  pathStorageDocument =user.document_path;
  if(files.document_path !== undefined){
    var tempFilePathDoc = files.document_path.path; 
    var  userFileNameDoc  = files.document_path.name;
    pathStorageDocument = './uploads/documents/'+body.id+'/'+userFileNameDoc;
    if (!fs.existsSync('./uploads/documents/'+body.id)){
        fs.mkdirSync('./uploads/documents/'+body.id);
    }
    fs.writeFileSync(  pathStorageDocument , fs.readFileSync(tempFilePathDoc))
    pathStorageDocument = pathStorageDocument.substring(1)
  }
 
  const result = Users.update(
    {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      image_path: pathStorageImg,
      document_path: pathStorageDocument,
    },
    {
        where:{
            id: body.id
        }
    }
    
  ); 
  return result;
};

module.exports={
    getUsers,
    getUserByMail,
    getUserById,
    createUser,
    updateUser
};