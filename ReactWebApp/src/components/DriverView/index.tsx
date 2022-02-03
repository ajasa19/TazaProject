import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Map, GoogleApiWrapper} from 'google-maps-react';
// import { Marker }from 'google-maps-react';
import Axios from 'axios';

const mapStyles = {
    width: '100%',
    height: '70%',
  };

const DriverView = (props) => {

    const [showDialog, setShowDialog] = React.useState(false);
    const [tripsList, setTripsList] = useState<any[]>([]);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);

    // load of items from DB after button press
   /* const getTrips = () => {
        Axios.get("http://localhost:3001/Trips/getTrips")
            .then((response) => {
                setTripsList(response.data);
            })
    };*/

    // inital load of items from DB
    React.useEffect(() => {

        //console.log('Trips - getting profile id');
        var tempIdString = localStorage.getItem("profileId");
        var profileId;
        var tripsId;
        if(tempIdString)
            profileId = JSON.parse(tempIdString || '');
        
        //console.log('Trips - profile id: ' +profileId);
        Axios.get<any>("http://localhost:3001/Trips/getTripsId", {
            params: {
                profileId: profileId,
            },
        }).then((response) => {
            //console.log('Trips - inside /getTripsId: ' +JSON.stringify(response));
            if(response.data.length > 0)
                tripsId = response.data[0].id;

            if(tripsId > -1){
                Axios.get("http://localhost:3001/Trips/getTripsId",{
                    params: {
                        tripsId: tripsId,
                    },
                }).then((response) => {
                    setTripsList(response.data);
                });
            }
        });
    }, []);

    const renderDialog = tripsList.map(
        (trip) =>
            <div>
                <Dialog open={showDialog}>
                    
                                <Typography gutterBottom variant="h6" component="div">
                                <p> PickUp:  {trip.pickUpLocation} </p>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                <p> DropOff: {trip.dropOffLocation} </p>
                                </Typography>
                                <br />
                                <Button variant="outlined" color="error" onClick={close} >
                                    Take it!
                                </Button>
                                <br />
                                <p>Price:</p>
                </Dialog>
                <br />
            </div>
    );

      const getTrips = () => {
          open();
          return({renderDialog});    
    };
    
        return (
            <Box>
                <div>
                    <Button >
                        My earnings
                     </Button>
                </div>
                <br></br>
                <div>
                <Typography align='center'>
            <Button onClick={()=>{getTrips()}}>
                GO!
            </Button> 

            <Dialog open={showDialog}>
                {renderDialog}
            </Dialog>
                </Typography>

                </div>
                <Map
          google={props.google}
        //   zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 45.3499, lng: -75.7549}}
        >
          {/* <Marker position={{ lat: 45.3499, lng: -75.7549}} /> */}
        </Map>
             
            </Box>
        );

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDil-3IWcSyAlxOT1PHnspDpYaFryxeA8Y'
  })(DriverView);