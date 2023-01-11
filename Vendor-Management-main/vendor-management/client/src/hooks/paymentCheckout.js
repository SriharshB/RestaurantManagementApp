import mongoose from 'mongoose';

const axios = require('axios');

const API_ENDPOINT = "http://localhost:8000/customer"
const VENDOR_ENDPOINT = "http://localhost:8000/vendor"


export default async function placeOrder(token, amount, cart, user){

    let response = await axios.get(`http://localhost:8000/customer/${user.username}`)
    const custID = response.data._id;
    console.log("Customer Fetched", response.data._id)

    response = await axios.get(`${VENDOR_ENDPOINT}/${cart.vendorID}/get`)
    // console.log("Vendor Fetched", response.data._id)
    
    const vendorid = response.data._id
    console.log("New VendorID:", vendorid)
    const vendorName = response.data.outletName
    const newOrderID = new mongoose.Types.ObjectId();
    
    response = await axios.post(`${API_ENDPOINT}/${custID}/cart/order`, {token, amount, cart, user, vendorName, newOrderID, custID})
    response = await axios.post(`${VENDOR_ENDPOINT}/${vendorid}/orders`, { cart, custID, newOrderID, amount})

}