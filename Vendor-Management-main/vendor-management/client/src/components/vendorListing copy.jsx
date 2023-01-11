import React, { Component } from "react";
import FoodItem from "./foodItem";
import { Grid } from "@mui/material";
import {useParams} from 'react-router-dom'
import { HttpGetVendorByID } from "../hooks/requests";

const VendorListing = () => {

  const [currentVendor, setVendor] = useState();
  const { id } = useParams();
  console.log(id);

  const setCurrentVendor = async() => {
    const fetchedVendor = await HttpGetVendorByID(id);
  }

  return (
    <div>
      <nav class="navbar navbar-dark bg-danger mb-5">
        <div class="container-fluid">
          <a class="navbar-brand text-center">Yummpy's</a>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary text-white" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <Grid
        container
        direction="column-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <FoodItem />
        <FoodItem />
        <FoodItem />
      </Grid>
    </div>
  );
};

export default VendorListing;

// class VendorListing extends Component {
//   state = {
//     currentVendor: {},
//   };

//   async componentDidMount() {

//     // const urlParams = new URLSearchParams(document.location.search);

//     // for (const [key, value] of urlParams) {
//     //   console.log(`${key}:${value}`);
//     // }

//     let params = new URLSearchParams(document);
//     console.log("Params",document.location.search)
//     let vendorID = params.get("id");
//     console.log(vendorID)
//     // this.setState({ currentVendor: await HttpGetVendorByID(vendorID) });
//   }
//   render() {
//     return (
// <div>
//   <nav class="navbar navbar-dark bg-danger mb-5">
//     <div class="container-fluid">
//       <a class="navbar-brand text-center">Yummpy's</a>
//       <form class="d-flex">
//         <input
//           class="form-control me-2"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//         />
//         <button class="btn btn-outline-primary text-white" type="submit">
//           Search
//         </button>
//       </form>
//     </div>
//   </nav>
//   <Grid
//     container
//     direction="column-reverse"
//     justifyContent="center"
//     alignItems="center"
//   >
//     <FoodItem />
//     <FoodItem />
//     <FoodItem />
//   </Grid>
// </div>
//     );
//   }
// }
