const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require("dotenv")
const stripe = require('stripe')('sk_test_51KpRU9SBeIeQYzIiqAVHThiuqtKV2kLZy1SLEeMSvyMIKsygSVZceHYlVATY42okNzWxujSaojdRnVShu6Hhu08w00rcRDKFZH');
const mongoose = require("mongoose")
const vendorAuthRouter = require('./routes/vendor_register/auth')
const vendorsRouter = require('./routes/vendors/vendors.router')
const CustomerUserRouter =require('./routes/customer_reg/User');
const VendorUserRouter =require('./routes/vendor_reg/VendorUser');
// require('./services/conn');
dotenv.config({path: './config.env'})

const app = express()
app.use(cors({
    origin: '*'
  }))
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json()); 
app.get('/', (req, res) => {
    res.send()
})
app.post('/webhook', express.json({type: 'application/json'}), (req, res) => {

    const event = req.body;
    // console.log("Body", req.body)

    switch(event.type){

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // console.log(`PaymentItent for ${paymentIntent.amount} was successful`)
            break;

        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // console.log("Payment Attached")
            break;

        default:
            // console.log(`Unhandled event type ${event.type}`)

    }

    res.send();
})

app.use('/vendor/auth', vendorAuthRouter);
app.use('/vendors' ,vendorsRouter)
app.use('/customer',CustomerUserRouter);
app.use('/vendor',VendorUserRouter);

module.exports = app;