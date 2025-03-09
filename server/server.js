require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
const authRoutesd = require('./routes/authd');
const patient_info = require('./routes/patientInfo');

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_ATLAS_URL;
app.use(cors());

app.use('/api/authd', authRoutesd);
app.use('/api/auth', authRoutes);
app.use('/api/patients',patient_info);

mongoose.connect(MONGO_URL, { useUnifiedTopology: true })
    .then(() => { console.log("Connected to database"); })
    .catch((err) => {
        console.error("Error in connecting to database:", err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
