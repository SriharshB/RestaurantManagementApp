const passport = require("passport");
const LocalStrategy2 = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
 
// const User = require("./server/src/models/customer");
const Vendor=require("./server/src/models/vendor");
 
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
    //console.log(token)
  }
  return token;
};

/*
const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  console.log(jwtPayload)
  User.findById(jwtPayload.sub, (err, user) => {
    if (err) {
      return done(err, null)
    }

    if (user) {
      return done(null, user)
    } else {
        //search in Admin collection
        Admin.findById(jwtPayload.sub,(err,admin) => {
            if(err){
                return done(err,null)
            }
            if(admin){
                return done(null,admin)
            }else{
                return done(null, false)
            }
        })
    }
*/


module.exports = function (passport) {
  // authorization
  passport.use("jwt-vendor",
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: "SmartVMC",
      },
      (payload, done) => {
        //console.log(payload);
        Vendor.findById({ _id: payload.sub }, (err, user) => {
          if (err) return done(err, false);
          if (user) return done(null, user);
          else return done(null, false);
        });
      }
    )
  );
 
  //authentication local startegy using username and password
  passport.use("vendor",
    new LocalStrategy2((username, password, done) => {
      Vendor.findOne({ username }, (err, user) => {

        //console.log(username, password)
        //something wnet wrong with database
        if (err) return done(err);
        //if no user exists
        if (!user) return done(null, false);
        //check if password is correct
        user.comparePassword(password, done);
      });
    })
  );
}
// authorization