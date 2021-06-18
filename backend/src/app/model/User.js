const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({ 

    name:String,
    email:String,
    password:String
})



schema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);

    }
    next();
})
schema.pre('updateOne',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);

    }
    next();
})
module.exports = mongoose.model("user",schema)