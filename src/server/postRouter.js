const express = require('express');
const router = express.Router();
const api = require('./postApi');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'pics')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname )
  }
});

const upload = multer({ storage: storage });


router.post('/post',upload.single('image') ,async(req,res) => {
    req.body.image = req.file.filename;
    console.log("Request body: ",req.body);
    try{
        console.log(req.body);
        const checkpost = await api.uploadPost(req.body);
        res.send(checkpost);
    }catch(err){
        res.send("error",err);
    }
})

router.post('/getposts',async(req,res) =>{
    try{    
        res.send(await(api.getPosts(req.body)));
    }catch{
        res.send(err);
    }
})
 
router.post('/myuploads',async(req,res) => {
    try{
        res.send(await(api.myuploads(req.body)));
    }catch{
        res.send(err)
    }
})

router.post('/singlepost',async(req,res) => {
    try{
        res.send(await(api.singlepost(req.body)));
    }catch{
        res.send(err)
    }
})

router.post('/addcomment',async(req,res) => {
    try{
        console.log("add comment",req.body);
        res.send(await(api.addcomment(req.body)));
    }catch{
        res.send(err);
    }
})

router.post('/getcomment',async(req,res) =>  {
    try{
        res.send(await(api.getcomment(req.body)));
    }catch{
        res.send(err);
    }
})

router.post('/addlike',async(req,res) =>  {
    try{
        res.send(await(api.addlike(req.body)));
    }catch{
        res.send(err);
    }
})

router.post('/postofcategory',async(req,res) => {
    try{
        res.send(await(api.postofcategory(req.body)));
    }catch{
        res.send(err);
    }
})



module.exports = router;