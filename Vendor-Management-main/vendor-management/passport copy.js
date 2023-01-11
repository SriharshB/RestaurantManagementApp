const passport1=require('passport');
const passport2 = require('passport');
const LocalStrategy=require('passport-local').Strategy;
const JwtStrategy=require('passport-jwt').Strategy

const User=require('./server/src/models/customer');
const Vendor = require('./server/src/models/vendors.mongo')


const cookieExtractor=req=>{
    let token=null;
    if(req && req.cookies){
        token=req.cookies["access_token"];
    }
    return token;
}

function userPassport(passport1){

    passport1.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: "SmartVMC"
    },( payload,done)=>{
        User.findById({_id: payload.sub},(err,user)=>{
            if(err)
                return done(err,false);
            if(user)
                return done(null,user);
            else
                return done(null,false);
        });
    }));
    
    //authentication local startegy using username and password
    passport1.use(new LocalStrategy((username,password,done)=>{
        User.findOne({username},(err,user)=>{
            //something wnet wrong with database
            if(err) 
                return done(err);
            //if no user exists
            if(!user)
                return done(null,false);
            //check if password is correct
             user.comparePassword(password,done);
        });
    }));
}

function vendorPassport(passport2){

    passport2.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: "SmartVMC"
    },( payload,done)=>{
        Vendor.findById({_id: payload.sub},(err,user)=>{
            if(err)
                return done(err,false);
            if(user)
                return done(null,user);
            else
                return done(null,false);
        });
    }));
    
    //authentication local startegy using username and password
    passport2.use(new LocalStrategy((username,password,done)=>{
        Vendor.findOne({username},(err,user)=>{
            //something wnet wrong with database
            if(err) 
                return done(err);
            //if no user exists
            if(!user)
                return done(null,false);
            //check if password is correct
             user.comparePassword(password,done);
        });
    }));
}

module.exports = {
    userPassport,
    vendorPassport
}
// authorization 
