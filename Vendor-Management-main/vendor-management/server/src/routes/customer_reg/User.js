const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const userDatabase = require('../../models/customer')
const User = require('../../models/customer');
const { HttpGetUserbyUsername,
    HttpGetUserCart,
    HttpAddItemToCart,
    HttpGetItemFromCart,
    HttpRemoveItemFromCart,
    HttpPlaceOrder,
    HttpGetCustomerOrders,
    HttpUpdateUserOrderStatus,
    HttpUpdateCustomerOrderRating } = require('./user.controller')
// require('../../../../passport1')(passport);
require('../../services/passport1')(passport)

const signToken = userID => {
    return JWT.sign({
        iss: "SmartVMC",   //payload
        sub: userID
    }, "SmartVMC", { expiresIn: "1h" });   //2nd argument is the key for passport to verify the token is legitimate
}

userRouter.post('/register', (req, res) => {
    const { username, password,role="customer", phoneNo, email, address, cart, orderList } = req.body;
    //  console.log(req.body);
    User.findOne({ username }, (err, user) => {
        //  console.log(err);
        if (err)
            res.status(500).json({ message: { msgBody: "Error Has Occured", msgError: true } });
        else if (user) //if username already exists
        {
            res.status(400).json({ message: { msgBody: "Username has already been taken", msgError: true } });
        }
        else {
            const newUser = new User({ username, password, role, phoneNo, address, email, cart, orderList });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "All fields are mandotory", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account Successfully Created", msgError: false } });
            })
        }
    });
});

//login route
userRouter.post('/login', passport.authenticate('user', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, email,role} = req.user;
        // console.log(username, email)
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        /* httpOnly will make sure that this token cant be changed from the client side using javascript 
        only with hence guards from cross-site scripting attacks
        SameSite prevents from cross-site forgery attacks
        Thus important for security by ensuring JWT token is not stolen
        */
        res.status(200).json({ isAuthenticated: true, user: { username, email,role } });
    }
});

// userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
//         if (req.isAuthenticated()) {
//             const { _id, username } = req.user;
//             const token = signToken(_id);
//             res.cookie('access_token', token, { httpOnly: true, sameSite: true });      
//            res.status(200).json({ isAuthenticated: true, user: { username } });
//           }
//         else{
//             res.status(401).json({ message: { msgBody: "Login not successful", msgError: true }});
//             //res.status(401).json({message: "Login not successful",msgError: true});
//         }
//   });

userRouter.post('/:username/cart', HttpAddItemToCart)
// userRouter.post('/:username/cart/create-checkout-session', HttpInitiateCheckout)
userRouter.post('/:username/cart/order', HttpPlaceOrder)
userRouter.get('/:username/orders', HttpGetCustomerOrders)


// logout route
userRouter.get('/logout', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    //if(req.isAuthenticated())
    res.clearCookie('access_token');
    //console.log('access_token');
    res.json({ user: { username: "",email:"",role:"" }, success: true });
});

//incase you want to write roles add a vendor route here


//to keep user signed in in case he closes the app but didnt logged out
userRouter.get('/authenticated', passport.authenticate('jwt-user', { session: false }), (req, res) => {
    const { username,email,role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username,email,role} });
});
module.exports = userRouter;

userRouter.get('/:username', HttpGetUserbyUsername)
userRouter.get('/:username/cart', HttpGetUserCart)
userRouter.get('/:username/cart/:id', HttpGetItemFromCart)
userRouter.delete('/:username/cart/:id', HttpRemoveItemFromCart)
userRouter.post('/:username/orders/:orderID/update', HttpUpdateUserOrderStatus)
userRouter.post('/:username/orders/:orderID/rate', HttpUpdateCustomerOrderRating)
