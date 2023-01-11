import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const SearchBox = ({ value, onChange }) => {

  const [searchString, setSearchString] = useState("");
  return (
    <TextField
      sx={{ margin: 3, marginLeft: 35, width: 0.5 }}
      value={searchString}
      placeholder="Search for restaurants by name or location"
      id="fullWidth"
      onChange={(e) => {
        // console.log("Value: ", e.target.value)
        setSearchString(e.target.value)
        onChange(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
