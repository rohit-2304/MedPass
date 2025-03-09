const express = require('express');

const patientInfo = require('../Models/patient_info');
const router = express.Router();


router.post("/patient_info/:username", async (req, res) => {
    const { username } = req.params;
    const data = req.body; 

    try { 
        if (data.username !== username) {
            return res.status(400).json({ error: "Username in body does not match the route parameter." });
        }

       
        if (!data.patient_name || !data.date_of_birth || !data.gender || !data.contact_info || !data.blood_group) {
            return res.status(400).json({ error: "Missing required fields. Please provide all necessary information." });
        }

        const newPatientInfo = new patientInfo(data);
        const savedInfo = await newPatientInfo.save();

       
        res.status(201).json({
            message: "Patient information saved successfully.",
            data: savedInfo,
        });
    } catch (error) {

        res.status(500).json({ error: "An error occurred while saving the patient information.", details: error.message });
    }
});

module.exports = router;
