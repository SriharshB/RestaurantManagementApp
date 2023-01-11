import React from "react";
import StripeCheckout from "react-stripe-checkout";
import placeOrder from "../hooks/paymentCheckout";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Fab from "@mui/material/Fab";


export default function Checkout({ amount, cart, user, changeCart }) {


  function tokenHandler(token) {
    placeOrder(token, amount, cart, user)
    // window.location.reload()

  }
  return (
    <div>
      <StripeCheckout
        amount={amount * 100}
        token={tokenHandler}
        currency="INR"
        shippingAddress={true}
        stripeKey="pk_test_51KpRU9SBeIeQYzIiIWwoTPMqS64jXuP3zzBTUnZSs5hQEjp2VJY2ZjAxjhaljUms6lCDdFZLUo7rBOfdh1wtUi3K00qG2uuQlb"
      >
        <Fab
          classname="btn"
          variant="extended"
          color="error"
          aria-label="add"
          sx={{ ml: 3, mt: 3 }}
        >
          <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
          Order Items
        </Fab>
      </StripeCheckout>
    </div>
  );
}
