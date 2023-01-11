const { getVendors,
    getVendorByID,
    getVendorOrders,
    getVendorMenu,
    addItemToMenu,
    deleteItemFromMenu,
    editItemFromMenu,
    getItemFromMenu,
    updateOrderStatus,
    addOrderToVendor,
    updateVendorRating,
    getOrdersByEmail } = require('../../models/vendors.model')

async function HttpGetAllVendors(req, res) {
    return res.send(await getVendors())
}

async function HttpGetVendorByID(req, res) {

    const vendorID = req.params.id
    // console.log("Backend", vendorID)

    return res.send(await getVendorByID(vendorID))
}

async function HttpGetVendorOrders(req, res) {

    const vendorID = req.params.id;
    // console.log("NOOO", vendorID)

    return res.send(await getVendorOrders(vendorID))
}

async function HttpGetVendorMenu(req, res) {

    const vendorID = req.params.id;
    // console.log("VendorID", vendorID)
    return res.send(await getVendorMenu(vendorID))
}

async function HttpAddItemToMenu(req, res) {

    const item = req.body
    const vendorID = req.params.id;


    return res.send(await addItemToMenu(vendorID, item))
}

async function HttpDeleteItemFromMenu(req, res) {

    const vendorID = req.params.id
    const itemKey = req.params.itemID

    return res.send(await deleteItemFromMenu(vendorID, itemKey))
}

async function HttpEditItemFromMenu(req, res) {

    const vendorID = req.params.id
    const item = req.body

    return res.send(await editItemFromMenu(vendorID, item.itemKey, item))
}

async function HttpGetItemFromMenu(req, res) {

    const vendorID = req.params.id;
    const itemKey = req.params.itemID;

    return res.send(await getItemFromMenu(vendorID, itemKey))
}

async function HttpUpdateOrderStatus(req, res) {

    const orderID = req.params.orderID
    const vendorID = req.params.id;
    // console.log("HTTP", orderID, vendorID)
    return res.send(await updateOrderStatus(vendorID, orderID));
}

async function HttpAddOrderToVendor(req, res) {

    const { cart, custID, newOrderID, amount } = req.body;
    const vendorID = req.params.id;
    // console.log("Values Log", cart, custID, vendorID);

    return res.send(await addOrderToVendor(vendorID, cart, custID, newOrderID, amount))
}

async function HttpUpdateVendorRating(req, res){

    const {rating} = req.body;
    const vendorID = req.params.id;
    const orderID = req.params.orderID
    return res.send(await updateVendorRating(vendorID, rating,orderID));
}

async function HttpGetOrdersByEmail(req, res){

    const vendorEmail = req.params.id;

    return res.send(await getOrdersByEmail(vendorEmail))
}

module.exports = {

    HttpGetAllVendors,
    HttpGetVendorByID,
    HttpGetVendorOrders,
    HttpGetVendorMenu,
    HttpAddItemToMenu,
    HttpDeleteItemFromMenu,
    HttpEditItemFromMenu,
    HttpGetItemFromMenu,
    HttpUpdateOrderStatus,
    HttpAddOrderToVendor,
    HttpUpdateVendorRating,
    HttpGetOrdersByEmail
}


