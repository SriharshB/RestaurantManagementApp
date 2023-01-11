import React from "react";
import SearchBox from "../components/searchBox";
import NewVendor from "../components/newVendor";
import Box from "@mui/material/Box";
import { httpGetVendors } from "../hooks/requests";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const API_URL = "http://localhost:8000";

function returnVendors() {
  const fetchedVendors = httpGetVendors();
  return fetchedVendors;
}

const vendors = [
  {
    _id: "6248399a5359a5fc68353655",
    cuisines: "All you'll find here is death",
    name: "Poison",
    owner: "Garvit",
    phone: "1234567890",
    email: "zeher@gmail.com",
    password: "123456",
    gst: "asdfsadfas",
    address: "Hell",
    rating: 0,
    orders: [],
    menu: [],
  },

  {
    _id: {
      $oid: "621ad4fccb12d77d1c0940b7",
    },
    cuisines: "This place should not exist",
    name: "Don't eat Here",
    owner: "Sauvadip",
    phone: "1234567890",
    email: "matkhao@gmail.com",
    password: "654321",
    gst: "GST",
    address: "54 Worst Ever Road, India",
    rating: -10,
    orders: [],
    menu: [],
  },
];

const Form = () => {
  const [allVendors, setVendors] = useState([]);
  const [searchQuery, setQuery] = useState("");
  const [filteredVendors, setFiltered] = useState([]);

  const getVendors = async () => {
    const { data: response } = await axios.get(`${API_URL}/vendors`);
    setVendors(response);
    setFiltered(response);
  };

  const navigate = useNavigate();
  const newVendors = allVendors;

  useEffect(() => {
    getVendors();
  }, []);

  const handleSearch = (query) => {

    if(query !== ""){
      const filteredVendors = getSearchData(query);
      setFiltered(filteredVendors);
    }else{
      setFiltered(allVendors);
    }
  };

  const getSearchData = (query) => {
    const searchText = query;
    const vendors = allVendors;

    let filtered = vendors;

    if (searchText)
      filtered = vendors.filter((v) =>
        v.outletName.toLowerCase().includes(searchText.toLowerCase()) || v.address.toLowerCase().includes(searchText.toLowerCase())
      );

    return filtered;
  };

  const onVendorSelect = (vendorID) => {
    const API_ENDPOINT = `/vendors/${vendorID}`;
    navigate(API_ENDPOINT);
  };

  return (
    <Box sx={{ justifyContent: "center" }}>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      {filteredVendors.map((vendor) => (
        <NewVendor
          key={vendor._id}
          vendorID={vendor._id}
          name={vendor.outletName}
          location={vendor.address}
          rating={vendor.rating}
          onSelect={onVendorSelect}
        />
      ))}
    </Box>
  );
};

export default Form;
