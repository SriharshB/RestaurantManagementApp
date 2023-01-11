//? Total Sales
//? Number of Orders
//? Number of customers
//? Weekly Sales Data
//? Lowest Ordered Items
//? Weekly Orders

const axios = require('axios')

const API_URL = 'http://localhost:8000/vendor'

function getDaysInMonth(month, year) {

    return new Date(year, month + 1, 0).getDate();
}

async function getVendor(vendorID){

    const ENDPOINT = `${API_URL}/${vendorID}/orders`
    const response = axios.get(ENDPOINT);
    return response;
    
}

function getRevenueDay(date, month, orders) {

    let totalAmount = 0;
    orders.forEach(order => {

        if (new Date(order.date).getDate() == date && new Date(order.date).getMonth() == month) {
            totalAmount = totalAmount + order.totalAmount;
        }
    })

    return totalAmount;
}

function getDailyOrder(date, month, orders) {

    let totalOrders = 0;

    orders.forEach(order => {

        if (new Date(order.date).getDate() == date && new Date(order.date).getMonth() == month) {
            totalOrders = totalOrders + 1;
        }
    })

    return totalOrders;
}

function getTotalSales(orders) {

    

    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();

    // const prev = getRevenueDay(date - 1, month, orders);
    const current = getRevenueDay(date, month, orders)

    let percentage = 0;

    // percentage = prev !== 0 ? current / prev - 1 : -1;

    return { current, percentage }
}

function getNumberOfOrders(orders) {



    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();

    const current = getDailyOrder(date, month, orders)

    let percentage = 0;


    return { current, percentage }
}

function getOrdersByCustomer(orders) {

    let customers = new Set();



    orders.forEach(order => {
        customers.add(order.customerID);
    })

    return customers.size;
}

function getWeeklyData(vendor) {

    const today = new Date();
    const orders = vendor.orderList;
    const date = today.getDate();
    const month = today.getMonth();
    let weekOrders = [];



    let newDay = 0;
    for (let i = date - 1; i >= date - 7; i--) {

        weekOrders.push(getDailyOrder(i, month, orders))
    }

    // console.log(weekOrders);
}

module.exports = {

    getTotalSales,
    getNumberOfOrders,
    getOrdersByCustomer,
    getWeeklyData,
    getVendor,
}