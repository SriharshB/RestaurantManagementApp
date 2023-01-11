import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./EditItem.css";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {editMenuItem, getMenuItem} from '../hooks/requests'
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext_consumer";
import { useContext } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function EditItem() {

  const [type, setType] = useState(true);
  const [itemName, setName] = useState("");
  const [itemPrice, setPrice] = useState("");
  const [itemDescription, setDescription] = useState("");
  const [itemKey, setItemKey] = useState()
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const {itemID} = useParams()

  useEffect(async() => {

    const response = await getMenuItem(itemID, user.email)
    // console.log("New", response)
    setName(response.itemName)
    setDescription(response.itemDescription)
    setPrice(response.itemPrice)
    setItemKey(response.itemKey)

  }, [])

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleName = (event) => {

    setName(event.target.value)
  }

  const handleDesc= (event) => {

    setDescription(event.target.value)
  }

  const handlePrice = (event) => {

    setPrice(event.target.value)
  }

  const submitForm = async() => {

    const price = parseFloat(itemPrice)
    const item = {
        itemKey,
        itemName,
        itemPrice:price,
        itemDescription,
        isVeg: type
    }

    // console.log(item)
    // console.log(itemKey)
    const response = await editMenuItem(item, user.email);

  };

  return ( itemName !="" && itemDescription != "" && itemPrice != "" &&
    <div>
      <Stack spacing={2}>
        <div className="editItem">
          <TextField
            label="Item Name"
            className="editField"
            id="outlined-helperText"
            defaultValue={itemName?itemName:""}
            onChange={handleName}
          />
          <TextField
          label = "Item Description"
            className="editField"
            id="outlined-helperText"
            defaultValue={itemDescription?itemDescription: ""}
            onChange={handleDesc}
          />
          <TextField
          label = "Item Price"
            className="editField"
            id="outlined-helperText"
            defaultValue={itemPrice?itemPrice:""}
            onChange={handlePrice}
          />
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type?type:""}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value={true}>Veg</MenuItem>
            <MenuItem value={false}>Non-Veg</MenuItem>
          </Select>
        </div>
      </Stack>
      <div className="buttons">
        <Button variant="contained" className="newButton" onClick={submitForm}>
          Save
        </Button>
      </div>
    </div>
  );
}
