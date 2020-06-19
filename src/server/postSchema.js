const mongoose = require('mongoose');
const schema = mongoose.Schema;

var post = new schema({
    username : {type:String},
    category : {type:String},
    description : {type:String},
    image : {type:String},
    date : {type:String},
    time : {type:String},
    comment : {type:Array},
    likes :{type:Array},
    totallikes:{type:Number},
});

module.exports = mongoose.model('post',post);