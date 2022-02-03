import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileCards from './profile_main';
import KitchenCards from './profile_kitchen';
import OrderCards from './profile_orders';
import ProfileSettingsCards from './profile_settings';
import { useParams } from 'react-router-dom';
import React from 'react';

//import { createTheme } from "@mui/material/styles";
//import { makeStyles } from "@mui/styles";

//const defaultTheme = createTheme();
// const useStyles = makeStyles(
//   (theme) => {
//     const getBackgroundColor = (color) =>
//       theme.palette.mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

//     const getHoverBackgroundColor = (color) =>
//       theme.palette.mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

//     return {
//       root: {
//         "& .super-app-theme--APPROVED": {
//           backgroundColor: getBackgroundColor(theme.palette.success.main),
//           "&:hover": {
//             backgroundColor: getHoverBackgroundColor(
//               theme.palette.success.main
//             ),
//           },
//         },
//         "& .super-app-theme--DENIED": {
//           backgroundColor: getBackgroundColor(theme.palette.error.main),
//           "&:hover": {
//             backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
//           },
//         },
//         "& .super-app-theme--PENDING": {
//           backgroundColor: getBackgroundColor(theme.palette.warning.main),
//           "&:hover": {
//             backgroundColor: getHoverBackgroundColor(
//               theme.palette.warning.main
//             ),
//           },
//         },
//       },
//     };
//   },
//   { defaultTheme }
// );

const Profile = () => {
    return (
        <div>
            <Home></Home>
        </div>
    );
}

const Home = () => {
    let { cardId }: { cardId: string } = useParams();
    cardId = cardId.substring(1, 2);
    let [profileCards, setProfileCards] = useState(<ProfileCards></ProfileCards>);

    const setConditionCards = () => {
        if (cardId === "0") {
            setProfileCards(profileCards = <ProfileCards></ProfileCards>)
        }
        else if (cardId === "1") {
            setProfileCards(profileCards = <KitchenCards></KitchenCards>)
        }
        else if (cardId === "2") {
            setProfileCards(profileCards = <OrderCards></OrderCards>)
        }
        else if (cardId === "3") {
            setProfileCards(profileCards = <ProfileSettingsCards></ProfileSettingsCards>)
        } else {
            setProfileCards(profileCards = <ProfileCards></ProfileCards>)
        }
    }

    React.useEffect(() => {
        setConditionCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let [value, setValue] = useState(Number(cardId));
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderTotalCostCard = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <br />
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia component="img" height="140" image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.simplytothrive.com%2Fwp-content%2Fuploads%2F2016%2F09%2Forange-header.jpg&f=1&nofb=1" />
                    <CardContent>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="action tabs example"
                        >
                            <Tab label="Profile" onClick={() => setProfileCards(profileCards = <ProfileCards></ProfileCards>)}/>
                            <Tab label="Kitchen" onClick={() => setProfileCards(profileCards = <KitchenCards></KitchenCards>)}/>
                            <Tab label="Orders" onClick={() => setProfileCards(profileCards = <OrderCards></OrderCards>)}/>
                            <Tab label="Settings" onClick={() => setProfileCards(profileCards = <ProfileSettingsCards></ProfileSettingsCards>)} />
                        </Tabs>
                    </CardContent>
                </Card>

                <br />


                <Box sx={{ width: 769 }}>
                    {profileCards}
                </Box> 

            </div>
        </div>
    );

    return (
        <ul> {renderTotalCostCard}  </ul>
    );
}
    

export default Profile;
