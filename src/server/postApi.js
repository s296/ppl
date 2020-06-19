const db = require('./postSchema');

module.exports = {
    getPosts : (data) => {
        return new Promise ((resolve,reject) => {
            db.find({}).sort({_id:-1}).exec(function(err, docs) 
            {
                if(err){
                    reject (err);
                }else{
                    resolve(docs);
                } 
            });
        })
    },
    uploadPost : (data) => {
        return new Promise ( (resolve,reject) => {
            db.create(data,(err,result) => {
                if (err){
                    reject(err);
                }else{
                    db.findOne({username: data.username},(err,result)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                    })
                }
            })
        })
    },
    myuploads : (data) => {
        return new Promise ( (resolve,reject) => {
            db.find({username:data.username}).sort({_id:-1}).exec(function(err, docs) 
            {
                if(err){
                    reject (err);
                }else{
                    resolve(docs);
                } 
            });
        } )
    },
    singlepost : (data) => {
        return new Promise ( (resolve,reject) => {
            db.find({_id:data.id}).exec(function(err, docs) 
            {
                if(err){
                    console.log("err",err);
                    reject (err);
                }else{
                    // console.log("docs",docs);
                    resolve(docs);
                } 
            });
        } )
    },
    addcomment : async(data) => {
        return new Promise ( (resolve,reject) => {
             db.updateOne({'_id':data.id},{'$push':{'comment':{'user':data.usercomment,'comment':data.comment}}}).exec(function(err,docs)
             {
                if(err){
                    console.log("err",err);
                    reject (err);
                }else{
                    // console.log("docs",docs,data.comment);
                    resolve(docs);
                } 
             });

        } )
    },
    getcomment : (data) => {
        return new Promise ( (resolve,reject) => {
           db.find({_id:data.id}).exec(function(err,docs)
             {
                if(err){
                    console.log("err",err);
                    reject (err);
                }else{
                    console.log("docs",docs,data.comment);
                    resolve(docs);
                } 
             });
        } )
    },
    addlike : (data) => {
        return new Promise ( (resolve,reject) => {
            
            db.find({'_id':data.id,likes: {$elemMatch :{'user':data.usercomment}}}).exec(function(err,documents){
                console.log(documents,"doc");
                if (documents.length == 0){
                    db.updateOne({'_id':data.id},{'$inc':{'totallikes':1}}).exec(function(err,docs){
                        console.log("inc",docs)
                    })
                    db.updateOne({'_id':data.id},{'$push':{'likes':{'user':data.usercomment,'likes':1}}}).exec(function(err,docs){
                        console.log("push ",docs);
                        db.find({'_id':data.id}).exec(function(err,doc){
                            console.log("no",doc)
                            resolve(doc);
                        })
                    })
                }else{
                    db.find({'_id':data.id,likes: {$elemMatch :{'user':data.usercomment,'likes':0}}}).exec(function(err,d){
                    console.log("d",d.length);
                        if(d.length==0){
                            db.updateOne({'_id':data.id},{'$inc':{'totallikes':-1}}).exec(function(err,docs){
                                console.log("inc",docs)
                            })
                            db.updateOne({'_id':data.id},{'$set':{'likes.$[elem].likes':0}},{arrayFilters:[{'elem.user':data.usercomment}]}).exec(function(err,docs){
                                console.log("already",docs);
                                db.find({'_id':data.id}).exec(function(err,doc){
                                    console.log("like0",doc);
                                    resolve(doc);
                                })
                            })
                        }else{
                            db.updateOne({'_id':data.id},{'$inc':{'totallikes':1}}).exec(function(err,docs){
                                console.log("inc",docs)
                            })
                            db.updateOne({'_id':data.id},{'$set':{'likes.$[elem].likes':1}},{arrayFilters:[{'elem.user':data.usercomment}]}).exec(function(err,docs){
                                console.log("already",docs);
                                db.find({'_id':data.id}).exec(function(err,doc){
                                    console.log("like1",doc);
                                    resolve(doc);
                                })
                            })
                        }
                    })
                }
            })
        })
    },
    postofcategory : (data) => {
        console.log("dara",data.category);
        return new Promise ( (resolve,reject) => {
            db.find({category:data.category}).exec(function(err, docs) 
            {
                if(err){
                    reject (err);
                }else{
                    resolve(docs);
                } 
            });
        })
    }
}