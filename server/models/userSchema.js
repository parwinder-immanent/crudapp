const { json } = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,

    },
    password: {

        type: String,
        require: true
    },
     
    image: {
        type: String,
    },
})

//hashing passsword


userSchema.pre('save',async function(next) {
    //console.log("inside userSchema")
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12)
    }
    next();
});



const abc =new mongoose.model("abc",userSchema)
module.exports=abc;
