import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const NewVendor = ({ vendorID, name, location, rating , onSelect}) => {
  return (
    <Box center>
      <Card container spacing={2} sx={{ mb: 2, marginLeft: 65,  maxWidth: 550 }}>
        <Grid item></Grid>
        <Img alt="image" src={require("./../imgs/cemetery.jpeg")} />
        <Grid item xs={12} sm container>
        
          <Grid item xs container direction="column" spacing={2}>
            
            <Grid item xs>
              
              <Typography gutterBottom variant="h5" component="div" sx = {{m: 2}}>
                {name}
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary" sx = {{m: 2}}>
                {location}
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" color="primary" sx = {{m: 1}} onClick = {() => {
                onSelect(vendorID)
              }}>
                order
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div" sx = {{m: 2}}>
              {`Rating: ${rating ? rating : 0}`}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export default NewVendor;
