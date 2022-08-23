const express = require("express");
const abc = require("../models/userSchema");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

//////////register user data////////
router.post("/register", async (req, res) => {
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
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await abc.findOne({ email: email });
    console.log(user)
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log(user.email);
            const token_payload = { name: user.name, email: user.email, password: user.password, age: user.age };

            
            let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
            let response = { message: 'Token Created, Authentication Successful!', token: token, ...token_payload };

            res.status(201).json(response);
            console.log(response)
        } else {
            res.status(400).json({ error: "invalid credientials pass" })
        }
    }
    else {
        return res.json({ result: "No User found" });
    }

})

////get data/////
router.get("/getdata", async (req, res) => {
    try {

        const userData = await abc.find();

        res.status(201).json(userData);
        console.log(userData);

    } catch (error) {
        res.status(422).json("No data found")
    };
})

/////get individual user/////////
router.get("/getuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userid = await abc.findById({ _id: id });
        res.status(201).json(userid);
        console.log(userid);

    } catch (error) {
        res.status(422).json(error)
        console.log("user not found")
    }

}
)
/////////////navbaar
router.get("/navbaar", async (req, res) => {
    try {
        const { id } = req.params;
        const userid = await abc.findById({ _id: id });
        res.status(201).json(userid);
        console.log(userid);

    } catch (error) {
        res.status(422).json(error)
        console.log("user not found")
    }

}
)
///////UPDATE DATA//////
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await abc.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        
     console.log("Data Update");
     res.status(201).json("Update Data Sucessful")
    }
    catch (error) {
        console.log("Data not updated");
        res.status(422).json("data not update")
    }

})



module.exports = router