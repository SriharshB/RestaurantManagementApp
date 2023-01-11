//made by rishab (for reference)

/*
username----------will have the email of the resteraunt 
outletName
ownerName
phoneNo
password
gstNo
address
rating
orderList
menu
*/

const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const VendorSchema=new mongoose.Schema({
    username:{
        type:String,
        required: true
    },    
    outletName:{           
        type:String,
        required:false
    },
    email:{
        type: String,
        required: false
    },
    role:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required:true
    },
    phoneNo:{
        type: String,
        required:false
    },
    address:{
        type: String,
        required: false
    },
    gstNo:{
        type: String,
        required: false
    },
    rating:{
        type: Number,
        required: false    
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
    }
});

VendorSchema.pre('save',function(next){
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
VendorSchema.methods.comparePassword = function(password,cb){
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

module.exports = mongoose.model('vendor',VendorSchema);