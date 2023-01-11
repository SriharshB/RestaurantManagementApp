import React, { Component } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { HttpGetUserByUsername, HttpAddItemToCart } from "./../hooks/requests";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

class FoodItem extends Component {
  state = {
    isAuthenticated: this.props.isAuthenticated,
    currrentUser: this.props.user,
    vendorID: this.props.vendor
  };

  onItemAdd = async () => {

    if (this.state.isAuthenticated) {

      const fetchedUser = await HttpGetUserByUsername(
        this.state.currrentUser.username
      );
      // console.log("Fetched User", fetchedUser)
      let userCart = fetchedUser["cart"];
      if(userCart['items'].length === 0){

        const newItem = {
          itemID: this.props.itemKey,
          itemName: this.props.itemName,
          itemPrice: this.props.itemPrice,
          itemDescription: this.props.itemDescription,
          isVeg: this.props.isVeg,
          image: this.props.image
        };

        const passedData = {
          item: newItem,
          vendorID: this.state.vendorID
        }

        const response = await HttpAddItemToCart(this.state.currrentUser.username, passedData)
        toast.success("Item Added to Cart!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      else if(userCart.vendorID.toString() !== this.state.vendorID ){

        toast.warn('Cannot add items from different vendors to cart!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

      }
      else{

        // console.log("User Cart", userCart)
        const newItem = {
          itemID: this.props.itemKey,
          itemName: this.props.itemName,
          itemPrice: this.props.itemPrice,
          itemDescription: this.props.itemDescription,
          isVeg: this.props.isVeg,
          image: this.props.image
        };
  
        // userCart.push(newItem)

        const passedData = {
          item: newItem,
          vendorID: this.state.vendorID
        }
  
        const response = await HttpAddItemToCart(this.state.currrentUser.username, passedData)
  
        // const newCart = [...userCart, newItem];
        // console.log(newCart)
        toast.success("Item Added to Cart!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } 
    
    else {
      toast.error("Please login to add item to cart!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    return (
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="image" src={require("./../imgs/pizza.jpg")} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {this.props.itemName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {this.props.itemDescription}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {this.props.isVeg === true ? "Vegetarian" : "Non-Vegetarian"}
                </Typography>
                <CardActions>
                  <Button size="small"></Button>
                </CardActions>
                <Grid item>
                  <Button size="small" onClick={async() => {
                    await this.onItemAdd()
                  }}>
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {`₹${this.props.itemPrice}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer />
      </Paper>
    );
  }
}

export default FoodItem;