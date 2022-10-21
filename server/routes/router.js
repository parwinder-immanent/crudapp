const express = require("express");
const abc = require("../models/userSchema");
const chat = require("../models/chatbox");
const router = express.Router();
const Conversation=require("../models/conversation")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })
  
  let upload = multer({ storage });






//////////register user data////////
router.post("/register",upload.single('image'), async (req, res) => {
    let image=(req.file)?req.file.filename:null;
    const { name, age, email, password } = req.body;
    if (!name || !email || !age || !password ||!image) {

        res.status(422).json("plz fill the data0");
    }


    /////check user  exist/////////////
    try {

        const preuser = await abc.findOne({ email: email })
        //console.log(preuser)
        if (preuser) {
            res.status(422).json("User are already exist");
        }
        else {
            const adduser = new abc({
                name, email, age, password,image
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
            const token_payload = { id:user._id,name: user.name, email: user.email, password: user.password, age: user.age };

            
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
    //     userdata = JSON.stringify({name:updateUser.name,email:updateUser.email});
    //     result = JSON.parse(userdata)
    //     console.log(result)
    // let jar = localStorage.setItem("token-info",result);
    //      console.log(jar)
     console.log("Data Update");
     res.status(201).json("Update Data Sucessful")
    
    }
    catch (error) {
        console.log("Data not updated");
        res.status(422).json("data not update")
    }

})
////////////Reset password///////////
router.post("/resetpassword", async (req, res) => {
      
    /////check user  exist/////////////
    try {
        const  { email, password } = req.body;

        const updatePassword = password;
    console.log(updatePassword)

        const preuser = await abc.findOne({ email: email })
        //console.log(preuser)
        if (!preuser) {
            res.status(422).json("Please enter valid email");
        }
        else {
            console.log("lkjlfjkd")
            const hashPassword =await bcrypt.hash(updatePassword, 12);
            console.log(hashPassword)
            const updateUser = await abc.findOneAndUpdate(email, {$set: {password: hashPassword}}, {
                new: true, useFindAndModify: false
            });
            res.status(200).json({msg: "Password updated successfully", updateUser});
            // console.log(updateUser);
        }
    }
    catch (error) {
        console.log("Data not updated");
        res.status(422).json("data not update")
    }


})







/////////////DELETE DATA USER///////////
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
    const {id}=req.params;
    const result=await abc.findByIdAndDelete({_id:id})
    console.log("deleted")
    res.status(201).json("data delete")
    }catch(error) {
        res.status(422).json(error)
    }

}
)
////////search handle
router.get("/search/:key",async (req,res,next)=>{
    //console.log (req.params.key)
    try{
        const searchParams = {"name": req.params.key}
        console.log(searchParams)
        const jobs = await abc.find(searchParams)
        if(!jobs) throw Error('Error, No Jobs Found...!')
        res.status(200).json(jobs)
    }catch(err){
        res.status(400).json({msg:err})
    }
    

    // let data = await abc.find(
    //     {
    //         "$or":[
    //             {"name":{$in:req.params.key}}
    //         ]
    //     }
       
    // )
    // console.log(data)
    // res.send(data)
})
/////////chatbox///////////
router.post("/chat", async (req, res) => {
    const{conversationId,sender,text}=req.body
    const newMessage = new chat({
        conversationId,
        sender,
        text
    });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
    // const { email, message } = req.body;
      
    // /////check user  exist/////////////
    // try {

    //     const preuser = await chat.findOne({ email: email })
    //     //console.log(preuser)
    //     if (preuser) {

    //         const adduser = new chat({
    //              email, message
    //         });
    //         await adduser.save();
    //         res.status(201).json(adduser);
    //         console.log(adduser);
    //     }
    //     else {
    //         const adduser = new chat({
    //             email, message
    //         });
    //         await adduser.save();
    //         res.status(201).json(adduser);
    //         console.log("kljsf",adduser);
    //     }
    // }
    // catch (error) {
    //     res.status(422).json(error);
    // }


})
////get messages or chat between two person/////////
router.get("/getchat/:conversationId", async (req, res) => {
    try {
        const messages = await chat.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
    // try {
    //     const { email } = req.params;
    //     const user = await chat.findByEmail({ email: email });
    //     res.status(201).json(user);
    //     console.log(user);

    // } catch (error) {
    //     res.status(422).json(error)
    //     console.log("Data not found")
    // }

}
)

///////////conversation///////////
router.post("/conversation", async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  /////////get conversation between twp person not a message text//
  router.get("/getconversation/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  



module.exports = router