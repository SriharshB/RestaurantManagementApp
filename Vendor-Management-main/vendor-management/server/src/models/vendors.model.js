const vendorsDatabase = require('./vendors.mongo')
const mongoose = require('mongoose')
const { updateUserOrderStatus } = require('./user.model')
const { lazyrouter } = require('express/lib/application')


async function addVendor(vendor){

    await vendorsDatabase.findOneAndUpdate({
        outletName: vendor.outletName,
    }, vendor, {
        upsert: true,
    })
}


async function getVendors() {

    return await vendorsDatabase.find({})

}

async function getVendorByID(vendorID){


    return await vendorsDatabase.findById(vendorID)
}

async function addOrderToVendor(vendorID, cart, customerID, newOrderID, amount){

    // console.log("Inside Log", vendorID, cart, customerID);

    const response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $push: {
            "orderList": {
                customerID: customerID,
                orderID: newOrderID.toString(),
                items: cart['items'],
                orderStatus: "In-Progress",
                totalAmount: amount,
                date: new Date()
            }
        }
    }, {new: true}).clone();

    console.log("Response: ", response);
    
    return response;
}

async function getVendorOrders(vendorID){

    // console.log("Logging VendorID/ Email", vendorID)
    const response = await vendorsDatabase.findOne({_id: vendorID});
    // console.log("Lessgooo",response.filter(item => item.email == vendorID)[0])
    // console.log(response['orderList'])
    return response
    // return response.filter(item => item.email == vendorID)[0].orderList;
}

async function getVendorMenu(vendorID){



    const response = await vendorsDatabase.findOne({"email": vendorID});
    // console.log("Nothing", response)
    return response;
}

async function addItemToMenu(vendorID, item){

    const response = await vendorsDatabase.findOneAndUpdate({"email": vendorID}, {
        $push: {

            "menu": {

                itemKey: new mongoose.Types.ObjectId(),
                itemName: item.itemName,
                itemPrice: item.itemPrice,
                itemDescription: item.itemDescription,
                image: " ",
                isVeg: item.isVeg
            }
        }
    })


    return response;
}

async function deleteItemFromMenu (vendorID, itemKey){

    // console.log("itemKey", itemKey, vendorID);

    const response = await vendorsDatabase.findOneAndUpdate({"email": vendorID}, {
        $pull: {
            "menu": {
                itemKey: mongoose.Types.ObjectId(itemKey)
            }
        }
    }, {new: true})

    return response.menu;
}

async function editItemFromMenu(vendorID, itemKey, item){

    // console.log(item);

    const response = await vendorsDatabase.findOneAndUpdate({"email": vendorID, "menu.itemKey": mongoose.Types.ObjectId(item.itemKey)}, {

        $set: {

            "menu.$.itemName": item.itemName,
            "menu.$.isVeg": item.isVeg,
            "menu.$.itemPrice": item.itemPrice,
            "menu.$.itemDescription": item.itemDescription,

        }

    }, {new: true});

    // console.log(response);

    return response
}

async function getItemFromMenu(vendorID, itemKey){


    const response = await vendorsDatabase.findOne({"email": vendorID})

    const menu = response['menu'];
    const newID = mongoose.Types.ObjectId(itemKey)
    const fetched = menu.filter((item) => item.itemKey.toString() == newID.toString())
    return fetched[0];
}

async function updateOrderStatus(vendorID, orderID){

    // console.log("vendorID", vendorID)

    const response = await vendorsDatabase.findOneAndUpdate({"email": vendorID, "orderList.orderID": orderID}, {
        $set: {
            "orderList.$.orderStatus": "Completed",
        }
    })

    // console.log("Response", response);
    return response;
}

function calculateNewRating(orderList){

    let completed = 0;
    let newRating = 0;

    orderList.forEach(order => {
        if(order.orderStatus == "Completed"){
            
            if(order.rating){
                completed += 1;
                newRating += order.rating;
            }
        }
    })

    newRating = newRating/completed;
    return newRating
}

async function updateVendorRating(vendorID, rating, orderID){

    const newID = mongoose.Types.ObjectId(orderID)
    let response = await vendorsDatabase.findOneAndUpdate({_id: vendorID, "orderList.orderID": orderID}, {
        $set: {
            "orderList.$.rating": rating,
        }
    }, {new: true}).clone();

    const finalRating = calculateNewRating(response.orderList);
    response = await vendorsDatabase.findOneAndUpdate({_id: vendorID}, {
        $set: {
            rating: finalRating,
        }
    }, {new: true});

    return response;
    
}

async function getOrdersByEmail(vendorEmail){

    // console.log("Fetching Vendor Orders Using Email")

    const response = await vendorsDatabase.findOne({"email": vendorEmail})
    // console.log("Vendor Fetched", response)
    return response;
}


module.exports = {
    getVendors,
    getVendorByID,
    addOrderToVendor,
    getVendorOrders,
    getVendorMenu,
    addItemToMenu,
    deleteItemFromMenu,
    editItemFromMenu,
    getItemFromMenu,
    updateOrderStatus,
    updateVendorRating,
    getOrdersByEmail
}