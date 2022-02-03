import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {
    BrowserRouter as Router,
    withRouter
  } from "react-router-dom";

const Confirmation = (props) => {
    const {history} = props;
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }    

    return (
    <Router>
        <Box sx={{ textAlign: 'center', marginTop:'20px'}}>
            <Typography variant="h3" >Thanks for Becoming A Partner!</Typography>
            <Divider sx={{margin: '10px'}}/>
            <Typography variant="h5">Your application is now under review, please wait about 48 hours for your approval status.</Typography>
            <br/>
            <Typography variant="h5">In the mean time please feel free to explore Taza and all of its wonderful kitchens!</Typography>
            <br/>
            <Button variant="contained" sx={{color: 'white'}} onClick={() => handleLinkClick("/")}>Back to home</Button>
        </Box>
    </Router>
    );
}

export default withRouter(Confirmation);