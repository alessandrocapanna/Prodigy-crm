const express = require("express");
const { getOffers,createOffer,createUsersOffers,getOfferById} = require("../controllers/offerController");
const router = express.Router();
// getall route
router.get('/', async (req, resp)=>{
    try{
        const result = await getOffers();

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
router.post('/create', async (req, resp)=>{
    try{
        const result = await createOffer(req.body);
        const resultAttach =await  createUsersOffers(req.body.usersId,result["id"])
        resp.json(resultAttach);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
router.post('/getbyid', async (req, resp)=>{
    try{
        const result = await getOfferById(req.body.id);
      
        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
module.exports= router;