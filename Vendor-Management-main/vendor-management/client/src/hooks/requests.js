import axios from "axios"

const API_URL = 'http://localhost:8000'

async function httpGetVendors() {

    const { data: response } = await axios.get(`${API_URL}/vendors`) //use data destructuring to get data from the promise object
    // console.log("HDFSDF",response);
    return response;

}

function vendorURL(vendorID) {

    return `${API_URL}/vendors/${vendorID}`
}

function userURL(username) {
    return `${API_URL}/customer/${username}`
}


export async function HttpGetVendorByID(vendorID) {

    const response = await axios.get(vendorURL(vendorID))
    return response
}

async function HttpGetVendorMenu(username){

    // console.log(`${API_URL}/vendor/${username}/menu`)
    const response = await axios.get(`${API_URL}/vendor/${username}/menu`)
    return response
}


async function HttpGetUserByUsername(username) {
    const response = await axios.get(userURL(username)).then((response) => {
        return response.data
    })
    return response
}

async function HttpAddItemToCart(username, item) {
    let userEndpoint = userURL(username)
    userEndpoint = userEndpoint + "/cart"
    // console.log("Inside HTTP Function to add Item: ", {item})
    const response = await axios.post(userEndpoint, {
        item,
    }).then((response) => {
        return response
    })
    return response
}

async function deleteItemFromCart(username, itemID){

    let userEndpoint = userURL(username)
    userEndpoint = userEndpoint + `/cart/${itemID}`
    const response = await axios.delete(userEndpoint)
    // console.log("Inside requests delete function", response)
    return response    
}

async function getCustomerOrders(username){

    let userEndpoint = userURL(username)
    userEndpoint = userEndpoint + `/orders`
    const response = await axios.get(userEndpoint);
    // console.log("Get Customer Function");
    return response;
}

async function updateVendorRating(rating, vendorID, orderID, customerID){

    const URL = `${API_URL}/vendor/${vendorID}/orders/${orderID}/rate`
    const response = await axios.post(URL, {rating})
    const userReponse = await axios.post(`${API_URL}/customer/${customerID}/orders/${orderID}/rate`, {rating})
    return response;
}

async function getVendorOrders(vendorEmail){

    const URL = `${API_URL}/vendor/${vendorEmail}/orders/email`
    const response = await axios.get(URL);
    console.log("Logging the response from the backend: ", response)
    return response;
}

async function getMenuItem(itemID, vendorID){


    const URL = `${API_URL}/vendor/${vendorID}/menu/edit/${itemID}`
    const response = await axios.get(URL);
    // console.log("Returned Response", response)
    return response.data;
}

async function editMenuItem(item, vendorID){

    const URL = `${API_URL}/vendor/${vendorID}/menu/edit/${item.itemID}`
    const response = await axios.post(URL, item);
    return response;
}

async function addItemToMenu(item, vendorID){

    const URL = `${API_URL}/vendor/${vendorID}/menu`
    const response = await axios.post(URL, item);
    return response;
}

async function deleteItemFromMenu(item, vendorID){


    const URL = `${API_URL}/vendor/${vendorID}/menu/${item.itemKey}`
    // console.log("Sent", item)
    const response = await axios.delete(URL);
    return response;
}

async function updateOrderStatus(orderID, customerID, vendorID){

    const VENDOR_URL = `${API_URL}/vendor/${vendorID}/orders/${orderID}/update`
    const CUSTOMER_URL = `${API_URL}/customer/${customerID}/orders/${orderID}/update`
    
    let response = axios.post(VENDOR_URL);
    response = axios.post(CUSTOMER_URL);

    return response;
}


export {
    httpGetVendors,
    HttpGetUserByUsername,
    HttpAddItemToCart,
    HttpGetVendorMenu,
    deleteItemFromCart,
    getCustomerOrders,
    updateVendorRating,
    getVendorOrders,
    editMenuItem,
    getMenuItem,
    addItemToMenu,
    deleteItemFromMenu,
    updateOrderStatus
}