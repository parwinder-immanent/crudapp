//initialize mongodb

const mongoose = require("mongoose");
///mongodb route to connect
const DB="mongodb+srv://abc:abc@cluster1.nuoev94.mongodb.net/crud?retryWrites=true&w=majority"
/////make connection function with mongodib
mongoose.connect(DB, {
  useNewUrlParser: true
}).then(()=> console.log("MongoDb connect")).catch((error)=>console.log(error.message));

