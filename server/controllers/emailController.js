const Email =require("../models").Email;
const apiKey = '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';
const sgMail = require('@sendgrid/mail');

async function getEmail(){
   const emails= Email.findAll();
    return emails;
};
async function getEmailByUser(userId){
    const emails= Email.findAll({where:{UserId:userId}});
     return emails;
 };
async function sendEmail(data){
    
    sgMail.setApiKey(apiKey);
    const message = {
        to: 'alessandro.capanna2@gmail.com',
        from: 'acapanna75@gmail.com',
        subject: data.title,
        text: data.subtitle,
        html: '<h1>'+data.text+'</h1>',
    }
    sgMail.send(message).then((res)=>{
        console.log(res);
        return  Email.create({UserId:data.UserId,title:data.title,subtitle:data.subtitle,text:data.text});
    }).catch(e=>{
        return e;
    })
 };

module.exports={
    getEmail,
    sendEmail,
    getEmailByUser
};