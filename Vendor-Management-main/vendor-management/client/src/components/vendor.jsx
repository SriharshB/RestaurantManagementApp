import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
const Vendor = ({name, cuisines}) => {

  const styles = {
    height: 150,
  };

  return (
    <React.Fragment>
      <div className="card m-5 w-98" style = {styles}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            {cuisines}
          </p>
          <a href="#" className="btn btn-danger">
            Order
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
 

export default Vendor;
