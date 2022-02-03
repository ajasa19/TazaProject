import * as React from "react";
//import { useState } from 'react';
import Axios from 'axios';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// interface FoodItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

interface Profile {
  id: number;
}

const FoodItemDialog = (props) => {
  const [profile, setprofile] = React.useState<Profile | null>(null);
  const [itemCount, setitemCount] = React.useState(1);

  React.useEffect(() => {
    var tempIdString = localStorage.getItem("profileId");
    var profileId;
    if (tempIdString) 
        profileId = JSON.parse(tempIdString || "");

    Axios.get<Profile>("http://localhost:3001/profile/getProfile", {
      params: {
        profileId: profileId,
      },
    }).then((response) => {
      setprofile(response.data[0]);
    });
  }, []);

  return (
    <Dialog open={props.dialogOpen} onClose={props.handleDialogClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 24px',
          color: 'black'
        }}
      >{props.name} {/*profile! && profile.id*/}

        <IconButton aria-label="cancel" sx={{float: 'right'}} onClick={props.handleDialogClose}>
          <ClearIcon />
        </IconButton>

      </DialogTitle>
      <Divider variant='middle'/>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1" color="text.secondary">
            {props.description ? props.description : "No Description"}.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {props.ingredients ? props.ingredients : "No ingredients"}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'space-between'}}>
        <Box >
          <IconButton size='large' aria-label="cancel" onClick={() => {if(itemCount>1)setitemCount(itemCount - 1)}}>
            <ChevronLeftIcon />
          </IconButton>
          {itemCount}
          <IconButton size='large' aria-label="cancel" onClick={() => {if(itemCount<99)setitemCount(itemCount + 1)}}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Button variant="contained" sx={{color: 'white', width:'75%'}} 
            onClick={()=> {props.handleDialogSubmission(profile!.id, props.id, itemCount); setitemCount(1)}}>
              Add {itemCount} items to Cart ${(props.price*itemCount).toFixed(2)} 
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodItemDialog;
