const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');

// require('../db/conn');
const User = require('./../../models/vendors.mongo')

// router.get('/',(req,res)=>{
//     res.send('hello world yoooooooooo from router auth.js server');
// });

//use async if u dont wish to write in promise format
router.post('/register',async(req,res)=>{  

    const {outletName,ownerName,phoneNo,email,password,gstNo,address} = req.body;
    
    if(!outletName || !ownerName || !phoneNo || !email || !password || !gstNo || !address)
    {
        return res.status(422).json({error:"Pls fill the details properly"});
    }
    
    try{

        const userExist= await User.findOne({email:email});

        if(userExist)
        {
            return res.status(422).json({error:"Email already exists"});
        }
        else
        {
            const user = new User({outletName:outletName,ownerName:ownerName,phoneNo: phoneNo,email:email,password:password,gstNo:gstNo,address:address});

            //hash the data before inserting, see presave method in userSchema.js
            const userRegister= await user.save();

            if(userRegister)
            {
                return res.status(201).json({message:"User created successfully"});
            }
            else
            {
                return res.status(500).json({error:"failed to register"});
            }
        }
    }catch(err) 
    {
        console.log(err);
    }

});

//login route
router.get('/signin',(req,res)=>{
    res.send('hi this is signin page');
});
router.post('/signin',async (req,res)=>{  

    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(400).json({error:"Pls fill the details properly"});
    }

    try{
        
        const userLogin= await User.findOne({email:email});
        //console.log(userLogin);

        if(userLogin)
        {
            const isMatch= await bcrypt.compare(password,userLogin.password);
            if(isMatch)
            {
                res.json({message:"User sign in successful!"});
            }
            else
            {
                res.status(400).json({error:"Invalid credentials"});
            }
        }
        else
        {
            res.status(400).json({error:"Invalid credentials"});
        }

    }catch(err)
    {
        console.log(err);
    }
    
});

module.exports=router;