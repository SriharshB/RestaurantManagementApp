const express = require('express');
const vendoruserRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const VendorUser = require('../../models/vendor');
const { HttpGetVendorOrders,
    HttpGetVendorMenu,
    HttpAddItemToMenu,
    HttpDeleteItemFromMenu,
    HttpEditItemFromMenu,
    HttpGetItemFromMenu,
    HttpUpdateOrderStatus,
    HttpAddOrderToVendor,
    HttpUpdateVendorRating, 
    HttpGetVendorByID,
    HttpGetOrdersByEmail} = require('../vendors/vendors.controller')
// require("../../../../passport2")(passport);
require('../../services/passport2')(passport)


/*
usrname----------will have the email of the resteraunt 
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

const signToken = userID => {
    return JWT.sign({
        iss: "SmartVMC",   //payload
        sub: userID
    }, "SmartVMC", { expiresIn: "1h" });   //2nd argument is the key for passport to verify the token is legitimate
}

vendoruserRouter.post('/register', (req, res) => {
    const { username = "", outletName = "Default", password = "", role="vendor", phoneNo = "", email = "", address = "", gst = "", rating = 0, orderList } = req.body;
    //  console.log(req.body);
    VendorUser.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error Has Occured", msgError: true } });
        else if (user) //if username already exists
        {
            res.status(400).json({ message: { msgBody: "Username has already been taken", msgError: true } });
        }
        else {
            const newUser = new VendorUser({ username, outletName, password,role, phoneNo, email, address, gst, rating, orderList });
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
vendoruserRouter.post('/login', passport.authenticate('vendor', { session: false }), (req, res) => {

    if (req.isAuthenticated()) {
        const { _id, username, email,role } = req.user;
        // console.log(username, email)
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        /* httpOnly will make sure that this token cant be changed from the client side using javascript 
        with hence guards from cross-site scripting attacks
        SameSite prevents from cross-site forgery attacks
        Thus important for security by ensuring JWT token is not stolen*/
        res.status(200).json({ isAuthenticated: true, user: { username, email,role } });
    }
});

// logout route
vendoruserRouter.get('/logout', passport.authenticate('jwt-vendor', { session: false }), (req, res) => {
    //if(req.isAuthenticated())
    res.clearCookie('access_token');
    //console.log('access_token');
    res.json({ user: { username: "", email: "",role:"" }, success: true });
});

vendoruserRouter.get('/:id/orders', HttpGetVendorOrders);
vendoruserRouter.get('/:id/menu', HttpGetVendorMenu);
vendoruserRouter.get('/:id/orders/email', HttpGetOrdersByEmail)
vendoruserRouter.post('/:id/menu', HttpAddItemToMenu);
vendoruserRouter.post('/:id/menu/edit/:itemID', HttpEditItemFromMenu)
vendoruserRouter.get('/:id/menu/edit/:itemID', HttpGetItemFromMenu);
vendoruserRouter.delete('/:id/menu/:itemID', HttpDeleteItemFromMenu);
vendoruserRouter.post('/:id/orders/:orderID/update', HttpUpdateOrderStatus)
vendoruserRouter.post('/:id/orders', HttpAddOrderToVendor)
vendoruserRouter.post('/:id/orders/:orderID/rate', HttpUpdateVendorRating)
vendoruserRouter.get('/:id/get', HttpGetVendorByID)

// //to keep user signed in in case he closes the app but didnt logged out
vendoruserRouter.get('/authenticated', passport.authenticate('jwt-vendor', { session: false }), (req, res) => {
    const { username, email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, email, role } });
});
module.exports = vendoruserRouter;
