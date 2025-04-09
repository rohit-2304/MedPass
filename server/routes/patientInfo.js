const express = require('express');

const patientInfo = require('../Models/patient_info');
const router = express.Router();

router.get("/patient_get_info/:username",async(req,res)=>{
    try{
    const {username} = req.params;
     const info = await patientInfo.findOne({username:username});
        
    res.status(200).json(info); }
    catch(e){
        res.status(500).json("Can't process request");
    }

})


module.exports = router;
