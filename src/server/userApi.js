const userdb = require('./userSchema');

checkemail = (data) =>{
    return new Promise((resolve,reject)=>{
        userdb.find({email:data.email} ,(err,res) => {
            resolve(res[0] != undefined);
        });  
    })    
}

module.exports = {
    userRegister: async (data)=>{
        if (await checkemail(data)){
            return null;
        }else{return new Promise((resolve,reject)=>{
            userdb.create(data,(err,result)=>{
                if(err){
                    reject(err);
                } else{
                    resolve(result);
                }
            })
         })}
    },
    checkUser : (data) => {
        // console.log("checkuser",data);
        return new Promise ((resolve,reject) => {
            userdb.findOne( { email:data.email , password:data.password},(err,result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    },   
    forgotPassword : (data) => {
        // console.log("forgot",data);
        return new Promise((resolve,reject) => {
            userdb.findOne( {email:data.email},(err,result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            } )
        })
    }
}