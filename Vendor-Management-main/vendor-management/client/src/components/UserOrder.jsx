import React from "react";
import { getCustomerOrders } from "../hooks/requests";
import { useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext_consumer";
import { useContext } from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { updateVendorRating } from "../hooks/requests";

function Row(props) {
  const { row, user } = props;
  const [open, setOpen] = React.useState(false);
  const [orderRating, setRating] = React.useState(row.rating);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.vendor || row.vendorID}</TableCell>
        <TableCell align="left">
          {(row.date && row.date.substring(0, 10)) || "Old Order"}
        </TableCell>
        <TableCell
          align="left"
          sx={{ color: row.orderStatus == "In-Progress" ? "orange" : "green" }}
        >
          <b>{row.orderStatus}</b>
        </TableCell>
        <TableCell align="left">{row.totalAmount}</TableCell>
        <TableCell align="left">
          {row.orderStatus == "Completed" && (
            <Rating
              name="simple-controlled"
              value = {orderRating}
              onChange={(event) => {
                setRating(event.target.value)
                updateVendorRating(
                  event.target.value,
                  row.vendorID,
                  row.orderID,
                  user.username
                );
              }}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Order Details</b>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Item Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Item Description</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Cost</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={item.date}>
                      <TableCell component="th" scope="row" align="center">
                        {item.itemName}
                      </TableCell>
                      <TableCell align="center">
                        {item.itemDescription}
                      </TableCell>
                      <TableCell align="center">{item.itemPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UserOrder() {
  const [orderList, setOrders] = useState([]);
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  useEffect(async () => {
    const orders = await getCustomerOrders(user.username);
    console.log("User Orders", orders.data);
    let sorted = orders.data.sort((a, b) => {
      return a.orderDate > b.orderDate;
    })
    // console.log(sorted)
    setOrders(sorted.reverse());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">
              <b>Vendor</b>
            </TableCell>
            <TableCell align="left">
              <b>Date</b>
            </TableCell>
            <TableCell align="left">
              <b>Order Status</b>
            </TableCell>
            <TableCell align="left">
              <b>Total Amount (₹)</b>
            </TableCell>
            <TableCell align="left">
              <b>Rating</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList &&
            orderList.length >= 1 &&
            orderList.map((order) => (
              <Row key={order.orderID} row={order} user={user} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
