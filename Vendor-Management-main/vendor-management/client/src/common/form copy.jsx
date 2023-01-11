import React, { Component } from "react";
import { getVendors } from "../services/vendorService";
import SearchBox from "../components/searchBox";
import NewVendor from "../components/newVendor";
import Box from "@mui/material/Box";
import { httpGetVendors } from "../hooks/requests";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

async function returnVendors() {
  return await httpGetVendors();
}

// class Form extends Component {
//   state = {
//     searchQuery: "",
//     allVendors: [],
//   };

//   componentDidMount = async () => {
//     const fetchedVendors = await httpGetVendors();
//     this.setState({ allVendors: fetchedVendors });
//   };

//   handleSearch = (query) => {
//     // console.log(query)
//     this.setState({ searchQuery: query });
//   };

//   getSearchData = () => {
//     const { searchQuery, allVendors: vendors } = this.state;
//     let filtered = vendors;

//     if (searchQuery)
//       filtered = vendors.filter((v) =>
//         v.outletName.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     return filtered;
//   };

//   onVendorSelect = (vendorID) => {
//     const API_ENDPOINT = `/vendors/${vendorID}`;
//     const navigate = useNavigate();
//     navigate(API_ENDPOINT);
//   };

//   render() {
//     const vendors = this.getSearchData();
//     const searchQuery = this.state.searchQuery;
//     return (
//       <Box sx={{ justifyContent: "center" }}>
//         <SearchBox value={searchQuery} onChange={this.handleSearch} />
//         {vendors.map((vendor) => (
//           <NewVendor
//             key={vendor._id}
//             name={vendor.outletName}
//             location={vendor.address}
//             rating={vendor.rating}
//             onSelect={this.onVendorSelect}
//           />
//         ))}
//       </Box>
//     );
//   }
// }

const Form = () => {
  const [allVendors, setVendors] = useState(returnVendors());
  const [searchQuery, setQuery] = useState("");

  const handleSearch = (query) => {
    // console.log(query)
    setQuery(query);
  };

  

  const getSearchData = () => {
    const searchQUery = searchQUery;
    const vendors = allVendors;

    let filtered = vendors;

    if (searchQuery)
      filtered = vendors.filter((v) =>
        v.outletName.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return filtered;
  };

  onVendorSelect = (vendorID) => {
    const API_ENDPOINT = `/vendors/${vendorID}`;
    const navigate = useNavigate();
    navigate(API_ENDPOINT);
  };

  setVendors(getSearchData());

  return (
    <Box sx={{ justifyContent: "center" }}>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      {vendors.map((vendor) => (
        <NewVendor
          key={vendor._id}
          name={vendor.outletName}
          location={vendor.address}
          rating={vendor.rating}
          onSelect={this.onVendorSelect}
        />
      ))}
    </Box>
  );
};

export default Form;

// export default Form;
