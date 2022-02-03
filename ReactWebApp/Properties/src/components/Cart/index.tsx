import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Sticky from 'react-sticky-el';

import { useState } from 'react';
import Axios from 'axios';
import Payment from './squarePayment';

const Cart = () => { 
    return (
        <div>
            <br></br>
            <Home></Home>
        </div>
    );
}

export default Cart;


const Home = () => {

    const [cartItemList, setCartItemList] = useState<any[]>([]);
    //const [cartTotalPrice, setCartTotalPrice] = useState<any[]>([]);
    //let [totalPrice, setTotalPrice] = useState(0);

    // alter quantity of cartItems
    const alterQuantity = (itemId, newQuantity) => {
        Axios.post("http://localhost:3001/cart/changeCartItemQty", {
            itemId: itemId,
            newQuantity: newQuantity
        }).then(() => {
            console.log("good qty pass");
        })
    };

    // alter total price of cart
    // const alterTotalPrice = (cartId, newTotal) => {
    //     Axios.post("http://localhost:3001/cart/changeCartTotalPrice", {
    //         cartId: cartId,
    //         newTotal: newTotal
    //     }).then(() => {
    //         console.log("good total pass");
    //     })
    // };

    // remove foodItem from cartItems
    const deleteItem = (itemId) => {
        Axios.post("http://localhost:3001/cart/deleteCartItem", {
            cartItemId: itemId
        }).then(() => {
            //console.log("good delete");
        })
    };

    // load of items from DB after button press
    const getUpdatedCartItems = () => {
        Axios.get("http://localhost:3001/cart/getCartItems")
            .then((response) => {
                setCartItemList(response.data);
            })
    };

    // inital load of items from DB
    React.useEffect(() => {

        //console.log('cart - getting profile id');
        var tempIdString = localStorage.getItem("profileId");
        var profileId;
        var cartId;
        if(tempIdString)
            profileId = JSON.parse(tempIdString || '');
        
        //console.log('cart - profile id: ' +profileId);
        Axios.get<any>("http://localhost:3001/cart/getCartId", {
            params: {
                profileId: profileId,
            },
        }).then((response) => {
            //console.log('cart - inside /getCartId: ' +JSON.stringify(response));
            if(response.data.length > 0)
                cartId = response.data[0].id;

            if(cartId > -1){
                Axios.get("http://localhost:3001/cart/getCartItems",{
                    params: {
                        cartId: cartId,
                    },
                }).then((response) => {
                    setCartItemList(response.data);
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderCards = cartItemList.map(
        (card) =>
            <div>
                <Card sx={{
                    maxWidth: 750,
                    maxHeight: 200,
                }}>
                    <Row>
                        <Col xs={2}>
                            <CardContent>
                                <img src={card.imageURL} alt='imageURL' style={{ height: 100, width: 100, objectFit: "cover", borderRadius: 4 }} />
                            </CardContent>
                        </Col>
                        <Col xs={5}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {card.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.kitchenName}
                                </Typography>
                            </CardContent>
                        </Col>
                        <Col>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    <br />
                                    ${card.price}
                                </Typography>
                            </CardContent>
                        </Col>
                        <Col>
                            <CardContent>
                                <br />
                                <Button variant="outlined" color="error" onClick={() => {
                                    alterQuantity(card.cartItemId, card.quantity - card.quantity);
                                    deleteItem(card.cartItemId);
                                    getUpdatedCartItems();
                                    //setTotalPrice(totalPrice = card.totalPrice);
                                }}>
                                    Remove
                                </Button>
                            </CardContent>
                        </Col>
                    </Row>

                    <CardActions>
                        <Row>
                            <Col xs={3}>
                                <h5 style={{ textAlign: "center" }}>Qty: </h5>
                            </Col>
                            <Col xs={3}>
                                <Button variant="contained" size="small" onClick={() => {
                                    if (card.quantity - 1 > -1) {
                                        alterQuantity(card.cartItemId, card.quantity - 1);
                                        getUpdatedCartItems();
                                        //setTotalPrice(totalPrice = card.totalPrice);
                                    }
                                }}>
                                    -
                                </Button>
                            </Col>
                            <Col xs={3}>
                                <h5 style={{ textAlign: "center" }}>{card.quantity}</h5>
                            </Col>
                            <Col xs={3}>
                                <Button variant="contained" size="small" onClick={() => {
                                    alterQuantity(card.cartItemId, card.quantity + 1);
                                    getUpdatedCartItems();
                                    // setTotalPrice(totalPrice = card.totalPrice);
                                }}>
                                    +
                                </Button>
                            </Col>
                        </Row>
                    </CardActions>

                </Card>
                <br />
            </div>
    );

    // const renderTotalCostCard = cartTotalPrice.map(
    //     (totalCostCard) =>
    //         <div>
    //             <Card sx={{
    //                 maxWidth: 750,
    //                 maxHeight: 200,
    //             }}>
    //                 <br></br>
    //                 <CardContent>
    //                     <Typography gutterBottom variant="h5" component="div">
    //                         <br />
    //                         ${totalCostCard.totalPrice.toFixed(2)}
    //                     </Typography>
    //                 </CardContent>
    //                 <br></br>
    //             </Card>
    //         </div>
    // );


    return (
        <div>
            <Container>
                <Row>
                    <Col xs={7}>
                        <ul>{renderCards}</ul>
                    </Col>
                    <Col>
                        <Sticky>
                            <br></br>
                            <br></br>
                            <br></br>
                            <header>
                                <Card>
                                    <br></br>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <br />
                                            {/* ${totalPrice.toFixed(2)} */}
                                        </Typography>
                                    </CardContent>
                                    <br></br>
                                </Card>
                                <Payment></Payment>
                            </header>
                        </Sticky>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

