const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const router = express.Router();


router.post('/register/patient',async (req,res)=>{
try{
    const {username,password} = req.body;
    const user = new User({username,password});
    await user.save();
 
    res.status(201).send('User registered');

}catch(err){
    res.status(500).send('Error registering user');
}
});
router.post('/login/patient',async (req,res)=>{
    try{ 
        const {username,password}= req.body;
        const user = await User.findOne({username});
        if(!user || !await user.isValidPassword(password)){
           return res.status(401).send('Invalid username or password')
        }
        const token = jwt.sign({id:user._id},'your_secret_token',{expiresIn:'1h'});
        res.status(200).json({token,username});
        

    }
    catch(err){
        res.status(500).send('Error in login')
    }
});

module.exports = router;

