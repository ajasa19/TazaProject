import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import {
    BrowserRouter as Router,
    withRouter
  } from "react-router-dom";
  
  const Header = props => {

    const {history} = props;
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }    
        return(
            <div>
            <br/>
            <br/>
            <br/>
            <Router>
                <Box
                    mt={2}
                    display="flex"  
                    justifyContent="center"
                > 
                    <Card sx={{ maxWidth: 345, boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Become a Driver
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  size="large" startIcon={<DirectionsCarIcon />} onClick={() => handleLinkClick('/becomeapartner/driver')}>Become a Driver</Button>

                            {/*<Button variant="contained"><DirectionsCarIcon />Become a Driver</Button>*/}
                        </CardActions>                    
            
                    </Card>
                    <br/>
                </Box>
                <br/>
                <br/>
                <Box
                    mt={2}
                    display="flex"  
                    justifyContent="center"
                > 
                    <Card sx={{ maxWidth: 345, boxShadow: '5px 5px 10px 3px rgba(0,0,0,0.62)' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Open A Kitchen
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  size="large" startIcon={<OutdoorGrillIcon />} onClick={() => handleLinkClick('/becomeapartner/kitchen')}>Open a Kitchen</Button>

                            {/*<Button variant="contained"><OutdoorGrillIcon />Open a Kitchen</Button>*/}
                        </CardActions>
                    </Card>
                </Box>
            </Router>
            </div>
        );
    
}

export default withRouter(Header);