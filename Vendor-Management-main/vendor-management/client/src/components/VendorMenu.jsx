import React from "react";
import { useContext } from "react";
import FoodItem from "./foodItem";
import VendorFoodItem from "./VendorFoodItem";
import { Grid } from "@mui/material";
import { HttpGetVendorMenu } from "../hooks/requests";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext_consumer";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function VendorMenu() {
  const [currentVendor, setVendor] = useState({});
  const [searchQuery, setQuery] = useState("");
  const [currentMenu, setMenu] = useState([]);
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
    // console.log("User", user)
  const [checked, setChecked] = useState(false);
  const [changedMenu, setChange] = useState([]);
  const { id } = useParams();

  useEffect(async () => {

    let fetchedVendor = await HttpGetVendorMenu(user.email);
    // console.log("Fetched Vendor", fetchedVendor.data)
    setVendor(fetchedVendor.data);
    setMenu(fetchedVendor.data.menu);
    setChange(fetchedVendor.data.menu);
  }, []);

  const setFoodItems = (query) => {
    let filtered = currentMenu;

    if (query) {
      filtered = currentMenu.filter((item) =>
        item.itemName.toLowerCase().includes(query.toLowerCase())
      );
    }

    setChange(filtered);
  };

  const triggerFilter = (event) => {
    if (checked) {
      setChange(currentMenu);
      setChecked(event.target.checked);
    } else {
      let filtered = changedMenu.filter((item) => item.isVeg == true);
      // console.log(filtered);
      setChange(filtered);

      setChecked(event.target.checked);
    }
  };

  return ( currentMenu && 
    <div>
      <nav class="navbar navbar-dark bg-danger mb-5">
        <div class="container-fluid">
          <a class="navbar-brand text-center">{currentVendor.outletName}</a>
          <form class="d-flex">
            <input
              onChange={(e) => {
                if (e.target.value === "") {
                  setChange(currentVendor.menu);
                  setQuery("");
                } else {
                  setQuery(e.target.value);
                }
              }}
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-primary text-white"
              type="button"
              onClick={() => {
                setFoodItems(searchQuery);
              }}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <Grid container justifyContent="center">
        <FormControlLabel
          value="end"
          control={
            <Switch
              color="warning"
              checked={checked}
              onChange={triggerFilter}
            />
          }
          label="Veg Only"
          labelPlacement="end"
        />
        <Grid
          container
          direction="column-reverse"
          justifyContent="center"
          alignItems="right"
        >
          {changedMenu.map((item) => (
            <VendorFoodItem
              key={item.itemName && item.itemKey}
              itemKey={item.itemKey}
              itemName={item.itemName}
              itemDescription={item.itemDescription}
              itemPrice={item.itemPrice}
              isVeg={item.isVeg}
              image={item.image ? item.image : ""}
              isAuthenticated={isAuthenticated}
              user={user}
              vendor={id}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
