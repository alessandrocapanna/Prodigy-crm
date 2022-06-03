const express = require("express");
const { getUsers,createUser,getUserById ,getUserByMail,updateUser} = require("../controllers/userController");
const router = express.Router();
const bcrypt = require("bcrypt");




//C R U D USERs

// getall route
router.get('/', async (req, resp)=>{
    try{
        const result = await getUsers();

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
// getbyid route
router.post('/getuser', async (req, resp)=>{
  try{
      const result = await getUserById(req.body.id);

      resp.json(result);
  } catch (e) {
      resp.status(500).send(e.toString());
  }

});

// update route
router.post("/update", async (req, resp) => {
  try{
      const result = await updateUser(req.files,req.fields);
      resp.json(result);
  } catch (e) {
      resp.status(500).send(e.toString());
  }
  
});

// register route
router.post("/register", async (req, resp) => {
    try{
        const result = await createUser(req.body);
        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }
    
});



// login route
router.post("/login", async (req, resp) => {
    const body = req.body;
    const user = await getUserByMail(body.email);
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const user = await getUserByMail(body.email);
        resp.status(200).json({ user});
      } else {
        resp.status(400).json({ error: "PASS INVALIDA" });
      }
    } else {
      resp.status(401).json({ error: "USER NON ESISTE" });
    }
});
module.exports= router;