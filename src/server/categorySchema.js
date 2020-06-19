const mongoose = require('mongoose');
const schema = mongoose.Schema;

const category = new schema({
    category : {type:String},
    image : {type:String}
})

module.exports = mongoose.model('categories',category);
