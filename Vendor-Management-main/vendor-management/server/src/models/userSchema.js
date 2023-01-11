const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    outletName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gstNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0,
        required:false
    },
    orderList:{
        type:[Object],
        default:[],
        required:false
    },
    menu:{
        type:[Object],
        default:[],
        required:false
    },
    //list of order id
    //list of food items
})

//we are hashing the password

userSchema.pre('save', async function(next){

    console.log('THIS HASH FUNCTION IS RUNNING');
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})

//USER is collection name in capital and is singular
const User= mongoose.model('vendor',userSchema);

module.exports= User;
