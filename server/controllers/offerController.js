
const Offers =require("../models").Offers;
const  UserOffer =require("../models").User_Offer;
const  Users =require("../models").Users;
//getall
async function getOffers(){
    return Offers.findAll({
        attributes: ['id','price','text']
      }
    );
};
//getall
async function createOffer(data){
    function createOffer(data) {
       return Offers.create({price:data.price,text:data.text});
    }
    const result = createOffer(data);
    return result;
     
};
async function createUsersOffers(usersId,id){
    for (let index = 0; index < usersId.length; index++) {
        UserOffer.create({UserId:parseInt(usersId[index]),OfferId:id});
    }
    return 'creato con successo'
};
async function getOfferById(id){
    const offerData =  Offers.findOne({
        where:{ id: id },
        include:[
            {model: Users} //load users
        ]
    });

    return offerData;
};


module.exports={
    getOffers,
    createOffer,
    createUsersOffers,
    getOfferById
};