import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
//import { useState } from "react";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import { useHistory } from 'react-router-dom';

import EditProfileCards from './profile_Edit';

const Profile = () => {
    return (
        <div>
            <Home></Home>
        </div>
    );
}

const Home = () => {

    const history = useHistory();

    const routeChangeGoToProfile = () => {
        let path = `/profile:0`;
        history.push(path);
    }

    //const { foodItemId }: { foodItemId: string } = useParams();

    const renderMainCard = (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <br />
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia component="img" height="140" image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.simplytothrive.com%2Fwp-content%2Fuploads%2F2016%2F09%2Forange-header.jpg&f=1&nofb=1" />
                    <CardContent>
                        <Button variant="outlined" color="primary" onClick={routeChangeGoToProfile}>
                            Back to Profile
                        </Button>
                    </CardContent>
                </Card>

                <br />

                <Box sx={{ width: 769 }}>

                    <EditProfileCards></EditProfileCards>

                </Box>

            </div>
        </div>
    );

    return (
        <ul> {renderMainCard}  </ul>
    );
}

export default Profile;
