const express = require('express');
const router = express.Router();
const api = require('./userApi');
const sgMail = require('@sendgrid/mail');


router.post('/signup',async (req, res) => {
    try{
        const registerUser = await api.userRegister(req.body);
        console.log('Data from api: '+registerUser);
        res.send(registerUser); 
    }
    catch(err){ 
        res.send(err);
        console.log(err);
    }
})

router.post('/login',async (req,res) => {
    try{
        const checkUser = await api.checkUser(req.body);
         res.send(checkUser);
    }catch(err){
         res.send(err);
    }
})

router.post('/forgotpassword',async (req,res) => {
    try{
        const forgotpassword = await api.forgotPassword(req.body);
        console.log("forgot router",forgotpassword); 
        // sgmail.setApiKey('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');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'garg10010@gmail.com',
            from: 'garg10010@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
            
        sgMail.send(msg) .then(() => {}, error => {
        console.error(error);
        console.log("msg",msg);
        if (error.response) {
            console.error(error.response.body)
        }
        });
        
        

        res.send(forgotpassword);
    }catch(err){
        res.send(err);
    }
})

module.exports = router;