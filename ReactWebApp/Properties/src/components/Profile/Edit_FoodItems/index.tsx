import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
//import { useState } from "react";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import { useHistory } from 'react-router-dom';

import EditFoodItemCards from './foodItem_Edit';

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
        let path = `/profile`;
        history.push(path);
    }

    //const [value, setValue] = useState(0);
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const renderMainCard = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <br />
                <Card sx={{ maxWidth: 800 }}>
                    <CardMedia component="img" height="140" image="https://nypost.com/wp-content/uploads/sites/2/2018/01/180105-guy-fieri-restaurant-closes-index.jpg?quality=80&strip=all" />
                    <CardContent>
                        <Button variant="outlined" color="primary" onClick={routeChangeGoToProfile}>
                                Back
                            </Button>
                    </CardContent>
                </Card>

                <br />

                <Box sx={{ width: 769 }}>
                    <EditFoodItemCards />
                </Box>

            </div>
        </div>
    );

    return (
        <ul> {renderMainCard}  </ul>
    );
}

export default Profile;
