const mongoose = require('mongoose');
const schema = mongoose.Schema;
const blogschema = new schema({
    fname:  {type: String},
    lname: {type: String},
    username: {type: String},
    email: {type:String},
    password: {type:String}
});

module.exports = mongoose.model('register',blogschema);