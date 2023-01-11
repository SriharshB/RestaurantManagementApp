const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const CustomerSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        required: false
    },
    phoneNo:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type: String,
        required: true
    },
    orderList:{
        type:[Object],
        default:[],
        required:false
    },
    cart:{
        type: Object,
        default: {items: [], vendorID: ""},
        required: false
    }
});

CustomerSchema.pre('save',function(next){
    if(!this.isModified('password')) // checks if the password field is already modified or not
        return next(); // if not modified hash the password
    // if we need to hash 
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
           return next(err);
        this.password=passwordHash; //overwritten the exisisting password with the hhashed password
        next();
    });
});

//method
CustomerSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{ // first argument is password from client,
        //second is hashed password, third is callback
        //console.log(password, this.password) 
        if(err)
            return cb(err);
        else
        {
            if(!isMatch) // if passwords doesnt match return null for error object
                return cb(null,isMatch);
            return cb(null,this); // this is the user object being attachedd to request object
        }
    })
}

module.exports = mongoose.model('customer',CustomerSchema);