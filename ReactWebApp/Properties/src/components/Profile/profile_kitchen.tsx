import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@mui/material/Divider';
// import Avatar from '@mui/material/Avatar';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import TextField from '@mui/material/TextField';
// import CardMedia from '@mui/material/CardMedia';
// import CardActions from '@mui/material/CardActions';
import { useHistory } from 'react-router-dom';

const kitchenData = [
    {
        id: 1,
        kitchenName: "All American Bistro",
        firstName: "Bob",
        lastName: "Jemir",
        emailAddress: "BoJem@gmail.com",
        profileImg: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.lebanoninapicture.com%2FPrv%2FImages%2FPages%2FPage_85980%2Fportrait-time-people-faces-man-mustache-leaves--2-14-2017-2-57-57-pm-l.jpg&f=1&nofb=1"
    }
];

const foodItemData = [
    {
        id: 1,
        foodItemName: "Gourdon-Hamsey Burger",
        fooditemDescription: "Bob",
        foodItemImg: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        foodItemPrice: 5.44
    },
    {
        id: 2,
        foodItemName: "The SJB Special: Grince Taco",
        fooditemDescription: "Bob",
        foodItemImg: "https://images-gmi-pmc.edge-generalmills.com/e59f255c-7498-4b84-9c9d-e578bf5d88fc.jpg",
        foodItemPrice: 12.23
    }
];

const Home = () => {

    const renderKitchenCards = kitchenData.map(
        (card) =>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <Box
                    sx={{
                        width: 800,
                        justifyContent: 'center',
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                >
                    <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                    Your Kitchen
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<EditIcon />} ></Button>
                                <Divider />
                                </Typography>
                                <b>Kitchen Name</b>:
                                <br />
                                {card.kitchenName}

                                <Divider />

                                <b>Kitchen Description</b>:
                                <br />
                                {card.firstName}

                                <Divider />

                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                        </CardContent>
                    </Card>

                </Box>
                <br />
                <Box
                sx={{
                    width: 800,
                    justifyContent: 'center',
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(1, 1fr)',
                }}
            >
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                            Food Items
                            <Button sx={{ color: 'default' }} size="large" startIcon={<AddCircleIcon />} ></Button>
                            <Divider />
                        </Typography>
                                <HomeKitchenCards />
                    </CardContent>
                </Card>

            </Box>
            </div>
        </div>
    );

    return (
        <ul> {renderKitchenCards}  </ul>
    );
}

const HomeKitchenCards = () => {

    const history = useHistory();

    const routeChangeGoToEditFoodItem = () => {
        let path = `/profile/EditFoodItem`;
        history.push(path);
    }

    const renderFoodItemCards = foodItemData.map(
        (card) =>  
            <Card sx={{
                maxWidth: 750,
                maxHeight: 200,
            }}>
                <Row>
                    <Col xs={2}>
                        <CardContent>
                            <img src={card.foodItemImg} alt='foodItemImg' style={{ height: 100, width: 100, objectFit: "cover", borderRadius: 4 }} />
                            </CardContent>
                    </Col>
                    <Col xs={5}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {card.foodItemName}
                            </Typography>
                        </CardContent>
                    </Col>
                    <Col>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                            <br />
                                {card.foodItemPrice}
                            </Typography>
                        </CardContent>
                    </Col>
                    <Col>
                        <CardContent>
                            <br />
                            <Button variant="outlined" color="primary" onClick={routeChangeGoToEditFoodItem}>
                            Edit
                            </Button>
                        </CardContent>
                    </Col>
                </Row>
            </Card>

    );

    return (
        <ul>
            {renderFoodItemCards}
        </ul>
        
    );
}

const KitchenCards = () => {
    return (
        <Home></Home>
    );
}

export default KitchenCards;
