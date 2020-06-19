const express = require('express');
const router = express.Router();
const api = require('./categoryApi');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'pics');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer ({storage:storage});
router.post('/put',upload.single('image'),async(req,res)=>{
    req.body.image = req.file.filename;
    try{
        const uploadCategory = await api.uploadCategory(req.body);  
        // console.log("category",uploadCategory);
        res.send(uploadCategory);  
    }catch{
        res.send(err);
    }
})

router.post('/getcategories',async(req,res)=>{
    try{
        res.send(await (api.getCategories(req.body)));
    }catch{
        res.send(err);
    }
})

module.exports = router;