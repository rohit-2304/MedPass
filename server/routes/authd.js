const express = require('express');
const jwt = require('jsonwebtoken');
const Doctor = require('../Models/doctor'); // Ensure the correct path to the Doctor model
const router = express.Router();

router.post('/register/doctor', async (req, res) => {
    try {
        const { username, password, registration_no, year, council } = req.body;
        const Doctor1 = new Doctor({username,registration_no,council,year,password});
        await Doctor1.save(); 
        res.status(201).send(`Doctor registered`);
    } catch (err) {
        console.error('Error registering Doctor:', err); // Log the error for debugging
        res.status(500).send('Error registering Doctor');
    }
});

router.post('/login/doctor', async (req, res) => {
    try {
        const { username, password } = req.body;
        const doctor = await Doctor.findOne({ username });
        if (!doctor || !await doctor.isValidPassword(password)) {
            return res.status(401).send('Invalid username or password');
        }
        const token = jwt.sign({ id: doctor._id }, 'your_secret_token', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error in login:', err); // Log the error for debugging
        res.status(500).send('Error in login');
    }
});

module.exports = router;
