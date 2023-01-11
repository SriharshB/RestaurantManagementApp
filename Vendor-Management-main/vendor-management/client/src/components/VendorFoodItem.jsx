import React, { Component } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { deleteItemFromMenu } from "./../hooks/requests";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function VendorFoodItem({
  itemKey,
  itemPrice,
  isVeg,
  isAuthenticated,
  user,
  vendor,
  itemName,
  itemDescription,
}) {
  // const state = {
  //   isAuthenticated: this.props.isAuthenticated,
  //   currrentUser: this.props.user,
  //   vendorID: this.props.vendor
  // };

  const navigate = useNavigate();
  let timerID = useRef(null);

  const onItemEdit = async () => {
    const API_ENDPOINT = `/menu/edit/${itemKey}`;
    navigate(API_ENDPOINT);
    // console.log("Edit Button Clicked");
  };

  const onItemDelete = async () => {
    const item = { itemKey, itemName };
    const response = await deleteItemFromMenu(item, user.email);
    // console.log(response)
    if (response.status === 200) {
      timerID = setTimeout(() => {
        navigate("/menu");
      }, 2000);
    }
    // console.log(response);
  };

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
                {itemName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {itemDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isVeg === true ? "Vegetarian" : "Non-Vegetarian"}
              </Typography>
              <CardActions>
                <Button size="small"></Button>
              </CardActions>
              <Grid item>
                <Button
                  size="small"
                  onClick={async () => {
                    await onItemEdit();
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  sx={{ m: 2 }}
                  onClick={async () => {
                    await onItemDelete();
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {`₹${itemPrice}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </Paper>
  );
}
