import React from "react";
import FeaturedData from "./FeaturedData";
import SaleOrder from "./SaleOrder";
import HighestOrder from "./HighestOrder";
import {
  getVendor,
  getTotalSales,
  getNumberOfOrders,
  getOrdersByCustomer,
} from "../services/DashboardService";
import { useEffect } from "react";
import { useState } from "react";

export default function VendorDashboard() {
  const [orders, setOrders] = useState([]);
  const [propObject, setObject] = useState({})
  let obj = {};

  useEffect(async () => {
    const orders = await getVendor("622325673c29e3dad4656ea6");
    const { current:currentSales, percentage:percentageSales } = getTotalSales(await orders.data);
    const { current: currentOrders, percentage: percentageOrders } = getNumberOfOrders(orders.data);
    const numberOfCustomers = getOrdersByCustomer(orders.data);
    obj = {
      currentSales,
      percentageSales,
      currentOrders,
      percentageOrders,
      numberOfCustomers,
    };

    setObject(obj)
    setOrders(orders);
  }, []);

  return (
    <div>
      <FeaturedData currentSales = {propObject.currentSales} currentOrders = {propObject.currentOrders} custs = {propObject.numberOfCustomers} />
      <SaleOrder orders={orders} />
      <HighestOrder orders={orders} />
    </div>
  );
}
