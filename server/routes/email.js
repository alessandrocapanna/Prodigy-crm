const express = require("express");
const { getEmail,getEmailByUser,sendEmail} = require("../controllers/emailController");
const router = express.Router();

// getbyid route
router.post('/getbyuser', async (req, resp)=>{
    try{
        const result = await getEmailByUser(req.body.userId);

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
// sendemail route
router.post('/sendemail', async (req, resp)=>{
    try{
        const result = await sendEmail(req.body);

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
module.exports= router;