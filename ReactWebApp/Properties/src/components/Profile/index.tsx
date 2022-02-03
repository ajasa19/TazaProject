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

const Profile = () => {
    return (
        <div>
            <Home></Home>
        </div>
    );
}

const Home = () => {

    let [profileCards, setProfileCards] = useState(<ProfileCards></ProfileCards>);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderTotalCostCard = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <br />
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia component="img" height="140" image="https://nypost.com/wp-content/uploads/sites/2/2018/01/180105-guy-fieri-restaurant-closes-index.jpg?quality=80&strip=all" />
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
                            <Tab label="Settings" onClick={() => setProfileCards(profileCards = <ProfileSettingsCards></ProfileSettingsCards>)}/>
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
