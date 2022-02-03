import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';

const Home = () => {

    const { orderId }: { orderId: string } = useParams();

    const [kitchenData, setKitchenData] = useState<any[]>([]);

    // inital load of items from DB
    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/kitchenOrders/getOrderdCustomer", {
            params: {
                orderId: orderId.substr(1,),
            },
        }).then((response) => {
            setKitchenData(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderKitchenCards = kitchenData.map(
        (card) =>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 1200 }}>

                    <FormControl fullWidth sx={{ m: 0, width: '50ch' }}>
                        <Box
                            sx={{
                                width: 400,
                                justifyContent: 'center',
                            }}
                        >
                            <br />
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        Order Status
                                        <Divider />
                                    </Typography>
                                    <FormControl fullWidth sx={{ m: 1, width: '40ch' }}>
                                        <b>{card.status}</b>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box
                            sx={{
                                width: 400,
                                justifyContent: 'center',
                            }}
                        >
                            <br />
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        Customer Details
                                        <Divider />
                                    </Typography>
                                    <FormControl fullWidth sx={{ m: 1, width: '40ch' }}>
                                        <b>Username:</b>
                                        {card.customerUserName}
                                        <Divider />
                                        <br />
                                        <b>Address:</b>
                                        {card.dropOffLocation}
                                        <Divider />
                                        <br />
                                        <b>Order placed time:</b>
                                        {card.orderTimeplaced}
                                        <Divider />
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box
                            sx={{
                                width: 400,
                                justifyContent: 'center',
                            }}
                        >
                            <br />
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        Driver Details
                                        <Divider />
                                    </Typography>
                                    <FormControl fullWidth sx={{ m: 1, width: '40ch' }}>
                                        <b>Username:</b>
                                        {card.driverUserName}
                                        <Divider />
                                        <br />
                                        <b>Pickup accepted time:</b>
                                        {card.orderTimePickup}
                                        <Divider />
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Box>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, width: '1ch' }}>
                        <Box
                            sx={{
                                width: 700,
                                justifyContent: 'center',
                                display: 'grid',
                                gap: 1,
                                gridTemplateColumns: 'repeat(1, 1fr)',
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                                        Orderd Items
                                        <Divider />
                                    </Typography>
                                    <HomeKitchenCards />
                                </CardContent>
                            </Card>

                        </Box>
                    </FormControl>

                   
                    <br />
                   
                </div>
            </div>
    );

    return (
        <ul> {renderKitchenCards}  </ul>
    );
}

const HomeKitchenCards = () => {

    var tempIdString = localStorage.getItem("profileId");
    var profileId;
    if (tempIdString)
        profileId = JSON.parse(tempIdString || '');

    const { orderId }: { orderId: string } = useParams();

    const [foodItemData, setKitchenFoodItems] = useState<any[]>([]);

    // inital load of items from DB
    React.useEffect(() => {
        Axios.get<any>("http://localhost:3001/kitchenOrders/getOrderdFoodItems", {
            params: {
                orderId: orderId.substr(1,),
                userId: profileId,
            },
        }).then((response) => {
            setKitchenFoodItems(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            </Typography>
                        </CardContent>
                    </Col>
                    <Col>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                <br />
                                Qty: {card.foodItemQty}
                            </Typography>
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