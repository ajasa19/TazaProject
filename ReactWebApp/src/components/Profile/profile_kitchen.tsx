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
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';
//import EditFoodItem from "./Edit_FoodItems";

let kitchenId = 0;

const Home = () => {

    var tempIdString = localStorage.getItem("profileId");
    var profileId;
    if (tempIdString)
        profileId = JSON.parse(tempIdString || '');

    const [kitchenData, setKitchenData] = useState<any[]>([]);

    // load of items from DB after button press
    // const getUpdatedCartItems = () => {
    //     Axios.get("http://localhost:3001/profile/getProfileLimited", {
    //         params: {
    //             userId: profileId,
    //         },
    //     }).then((response) => {
    //             setKitchenData(response.data);
    //         })
    // };

    const history = useHistory();

    const routeChangeGoToAddFoodItem = () => {
        let urlString = '/profile/AddFoodItem:' + 0;
        history.push(urlString);
    }

    const routeChangeGoToEditKitchen = () => {
        let urlString = '/profile/EditKitchen';
        history.push(urlString);
    }

    // inital load of items from DB
    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/profileKitchen/getKitchenData", {
            params: {
                userId: profileId,
            },
        }).then((response) => {
            setKitchenData(response.data);
            if (response.data.length > 0)
                kitchenId = response.data[0].kitchenId;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderKitchenCards = kitchenData.map(
        (card) =>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 800 }}>
                <Box
                    sx={{
                        width: 800,
                        justifyContent: 'center',
                    }}
                    >
                        <br />
                    <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                    Your Kitchen
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<EditIcon />} onClick={() => routeChangeGoToEditKitchen()} ></Button>
                                <Divider />
                                </Typography>

                                <FormControl fullWidth sx={{ m: 1, width: '47ch' }}>
                                    <b>Kitchen Name:</b>
                                    {card.kitchenName}
                                    <Divider />
                                    <br />
                                    <b>Kitchen Location:</b>
                                    {card.kitchenLocation}
                                    <Divider />
                                    <br />
                                    <b>Kitchen Description:</b>
                                    {card.kitchenDesc}
                                    <Divider />
                                </FormControl>

                                <FormControl fullWidth sx={{ m: 4, width: '30ch' }}>
                                    <b>Kitchen Thumbnail:</b>
                                    <img src={card.kithcenImgUrl} alt='foodItemImg' style={{ height: 185, width: 300, objectFit: "cover", borderRadius: 3 }} />
                                </FormControl>
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
                                    <Button sx={{ color: 'default' }} size="large" startIcon={<AddCircleIcon />} onClick={() => routeChangeGoToAddFoodItem() }></Button>
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

    const [foodItemData, setKitchenFoodItems] = useState<any[]>([]);

    // inital load of items from DB
    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/profileKitchen/getKitchenFoodItems", {
            params: {
                kitchenId: kitchenId,
            },
        }).then((response) => {
            setKitchenFoodItems(response.data);
        });
    }, []);

    const history = useHistory();

    const routeChangeGoToEditFoodItem = (foodItemId) => {
        let urlString = '/profile/EditFoodItem:' + foodItemId;
        history.push(urlString);
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
                            <Button variant="outlined" color="primary" onClick={() => { routeChangeGoToEditFoodItem(card.foodItemId) }}>
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