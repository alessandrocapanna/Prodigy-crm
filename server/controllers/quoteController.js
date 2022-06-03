const Quotes =require("../models").Quotes;

//getall
async function getQuotes(){
    return Quotes.findAll({
            attributes: ['id','User_id','text','price']
    });
};
async function getQuoteByUser(data){
    return Quotes.findAll({where: {
        userId: data.userId
      }
    });
};
async function creteQuotes(data){
    Quotes.create({UserId:data.userId,text:data.text,price:data.price});
    return 'PREVENTIVO CREATO CON SUCCESSO';
};
module.exports={
    getQuotes,
    getQuoteByUser,
    creteQuotes
};