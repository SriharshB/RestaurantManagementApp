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
import {editMenuItem, getMenuItem, addItemToMenu} from '../hooks/requests'
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext_consumer";
import { useContext } from "react";

export default function AddItem() {
  const [type, setType] = useState(true);
  const [itemName, setName] = useState("");
  const [itemPrice, setPrice] = useState("");
  const [itemDescription, setDescription] = useState("");
  const [itemKey, setItemKey] = useState();
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const { itemID } = useParams();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDesc = (event) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const submitForm = async() => {

    const price = parseFloat(itemPrice)
    const item = {
        itemKey,
        itemName,
        itemPrice:price,
        itemDescription,
        isVeg: type
    }

    const response = await addItemToMenu(item, user.email);

  };
  return (
    <div>
      <Stack spacing={2}>
        <div className="editItem">
          <TextField
            label="Item Name"
            className="editField"
            id="outlined-helperText"
            onChange={handleName}
          />
          <TextField
            label="Item Description"
            className="editField"
            id="outlined-helperText"
            onChange={handleDesc}
          />
          <TextField
            label="Item Price"
            className="editField"
            id="outlined-helperText"
            onChange={handlePrice}
          />
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
