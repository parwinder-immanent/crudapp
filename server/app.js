require('dotenv').config()
const  express = require("express");
const cors = require("cors");
const port =5000;
const app = express();
const abc =require("./models/userSchema")
const router =require("./routes/router")
require('./db/conn')
//used in backend for sharing resource different orgins 
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server running on localhost ${port}`);
  });