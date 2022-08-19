const express = require("express");
const abc = require("../models/userSchema");
const router=express.Router();


//////////register user data////////
router.post("/register",async(req,res)=>{
    const { name, age, email, password } = req.body;
    if (!name || !email || !age || !password) {

        res.status(422).json("plz fill the data0");
    }


    /////check user  exist/////////////
    try {

        const preuser = await abc.findOne({ email: email })
        console.log(preuser)
        if (preuser) {
            res.status(422).json("User are already exist");
        }
        else {
            const adduser = new abc({
                name, email, age, password
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }
    catch (error) {
        res.status(422).json(error);
    }
})
/////////login/////////
router.post("/login",async(req,res)=>{
    const {email,password}=req.body
const user = await abc.findOne(req.body);
console.log(user)
if(user)
{    console.log(user.email);
    //const token_payload = {email: user.email, password: user.password,age:user.age};
    
    //let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      //let response = {message: 'Token Created, Authentication Successful!', token: token, ...token_payload };
    
    return res.status(201).json(user);
}
else{
    return res.json({result:"No User found"});}

})




module.exports=router