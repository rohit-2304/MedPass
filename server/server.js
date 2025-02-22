require('dotenv').config();
const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const MONGO_URL =  process.env.MONGO_ATLAS_URL;
app.use(cors());


 app.use('/api/auth',authRoutes);

mongoose.connect(MONGO_URL).then(()=>{console.log("Connected to database")}).catch(()=>{
        console.error("error in connecting to database");
    })


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})