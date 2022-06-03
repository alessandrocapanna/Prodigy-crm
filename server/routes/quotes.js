const express = require("express");
const { getQuotes,getQuoteByUser, creteQuotes} = require("../controllers/quoteController");
const router = express.Router();

// getall route
router.get('/', async (req, resp)=>{
    try{
        const result = await getQuotes();

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});

router.post('/getbyuser', async (req, resp)=>{
    try{
        const result = await getQuoteByUser(req.body);

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
router.post('/create', async (req, resp)=>{
    try{
        const result = await creteQuotes(req.body);

        resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }

});
module.exports= router;