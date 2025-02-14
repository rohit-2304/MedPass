const express = require("express");
const app = express();
require('dotenv').config();
require('./Models/db.js');

const PORT =process.env.PORT || 8080;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{

    res.send("ew32");
});




app.listen(PORT,()=>{
    console.log('Server is runnong on port 8080')
});