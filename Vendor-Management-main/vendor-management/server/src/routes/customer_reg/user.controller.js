const { getUserbyUsername,
    addItemToCart,
    getCartByUsername,
    deleteItemFromCart,
    placeOrder,
    getCustomerOrders,
    updateCustomerOrderStatus,
    updateCusomterOrderRating } = require('../../models/user.model')

async function HttpGetUserbyUsername(req, res) {
    const userName = req.params.username
    return res.send(await getUserbyUsername(userName))
}

async function HttpGetUserCart(req, res) {

    const username = req.params.username;
    return res.send(await getCartByUsername(username));
}

async function HttpAddItemToCart(req, res) {

    const userName = req.params.username;
    const data = req.body
    const response = await addItemToCart(userName, data)
    return res.send(response)

}

async function HttpGetItemFromCart(req, res) {

    const username = req.params.username;
    let cart = await getCartByUsername(username)
    cart = cart['cart']['items'];
    let filtered = cart.filter(item => item.itemID.toString() == req.params.id)
    // console.log(filtered)
    return res.send(filtered[0])
}

async function HttpRemoveItemFromCart(req, res) {

    const username = req.params.username;
    const itemID = req.params.id;
    const response = await deleteItemFromCart(username, itemID).then((response) => {
        return response
    });
    // console.log("Response inside HTTP Backend Delete Function", response);
    res.send(response)
}

async function HttpPlaceOrder(req, res){

    const {token, amount, cart, user, vendorName, newOrderID, custID} = req.body;
    // console.log()
    res.send(await placeOrder(custID, token, amount, cart, user, vendorName, newOrderID));

}

async function HttpGetCustomerOrders(req, res){

    const username = req.params.username;
    const response = await getCustomerOrders(username).then((response) => {
        return response;
    })

    res.send(response);
}

async function HttpUpdateUserOrderStatus(req, res){

    const username = req.params.username;
    const orderID = req.params.orderID;
    
    res.send(await updateCustomerOrderStatus(username, orderID))
}

async function HttpUpdateCustomerOrderRating(req, res){

    const username = req.params.username
    const orderID = req.params.orderID;
    const {rating} = req.body
    res.send(await updateCusomterOrderRating(username, orderID, rating))
}


module.exports = {
    HttpGetUserbyUsername,
    HttpGetUserCart,
    HttpAddItemToCart,
    HttpRemoveItemFromCart,
    HttpGetItemFromCart,
    HttpPlaceOrder,
    HttpGetCustomerOrders,
    HttpUpdateUserOrderStatus,
    HttpUpdateCustomerOrderRating
}