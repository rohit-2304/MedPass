const express = require("express");
const app = express();
require('dotenv').config();

const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const authRoutes = require('./routes/api');

const PORT = process.env.PORT || 3000;
MONGO_URL = "mongodb://127.0.0.1:27017/MedPass_data";
// app.use(cors());
app.use(bodyParser.json());


// app.use('/api/auth',authRoutes);

mongoose.connect(process.env.MONGO_URL||MONGO_URL).then(()=>{console.log("Connected to database")}).catch(()=>{
        console.error("error in connecting to database");
    })


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})