const db = require('./categorySchema');

checkCategory = (data) =>{
    return new Promise((resolve,reject)=>{
        db.find({category:data.category} ,(err,res) => {
            resolve(res[0] != undefined);
        });  
    })    
}

module.exports = {
    uploadCategory: async(data) => {
        if(await checkCategory(data)){
            return null;
        }else  {
            return new Promise ((resolve ,reject) =>{ 
                db.create(data,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })    
            })

        }
    },
    getCategories : (data) => {
        return new Promise ((resolve,reject) => {
            db.find({},(err,result)=>{
                if(err){
                    reject (err);
                } else {
                    console.log("categoryapi",result);
                    resolve (result);
                }
            });
        })
    },
}