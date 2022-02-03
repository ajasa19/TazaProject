const express = require("express");
//const mysql = require("mysql");
const app = express();
const dobyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

app.use(dobyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var config = require("./../config.js");
var connection = config.connection;

//changeCartItemQty
router.post('/changeCartItemQty', (req, res) => {
    const itemId = req.body.itemId;
    const newQuantity = req.body.newQuantity;

    connection.query("UPDATE cart_items SET quantity = ? WHERE id = ?;", [newQuantity, itemId], (err, result) => {
        if (err) throw err;
        res.send("qty update complete");
    });
});

//changeCartTotalPrice
router.post('/changeCartTotalPrice', (req, res) => {
    const cartId = req.body.cartId;
    const newTotal = req.body.newTotal;

    connection.query("UPDATE cart SET totalPrice = ? WHERE id = ?;", [newTotal, cartId], (err, result) => {
        if (err) throw err;
        res.send("qty update complete");
    });
});

//deleteCartItem
router.post('/deleteCartItem', (req, res) => {
    const cartItemId = req.body.cartItemId;

    connection.query("DELETE FROM cart_items WHERE id = ?;", [cartItemId], (err, result) => {
        if (err) throw err;
        res.send("delete item complete");
    });
});

//getCartItems
router.get('/getCartItems', (req, res) => {
    const cartId = req.query.cartId;
    connection.query("SELECT cart_items.id AS cartItemId, cart_items.cartId AS cartId, cart_items.quantity AS quantity, food_items.id AS foodItemId, food_items.name AS name, (FORMAT(food_items.price, 2)) AS price, food_items.imageURL AS imageURL, kitchen.id AS kitchenId, kitchen.name AS kitchenName, cart.totalPrice AS totalPrice FROM cart_items JOIN food_items ON food_items.id = cart_items.foodItemId JOIN kitchen ON kitchen.id = food_items.kitchenId JOIN cart ON cart.id = cart_items.cartId WHERE cart.id = ?;",[cartId] , (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

//getTotalPrice
router.get('/getTotalPrice', (req, res) => {
    const cartId = req.query.cartId;

    var query = connection.query("SELECT COALESCE(CONCAT(FORMAT(SUM(price * quantity), 2)), 0.00) AS totalPrice FROM cart_items JOIN food_items ON food_items.id = cart_items.foodItemId  WHERE cart_items.cartId = ?;", [cartId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

router.post('/addItemToCart', async (req, res) => {

    const profileId = req.body.profileId
    const foodItemId = req.body.foodItemId
    const quantity = req.body.quantity

    /* CHECK IF CART EXISTS */
    connection.query("SELECT * FROM cart WHERE userId = ?;", [profileId], async (err, result) => {
        if (err) throw err;

        if(result.length === 0){
            /* CREATE NEW CART ROW*/
            await connection.query("INSERT INTO cart (userId, totalPrice) VALUES (?, 0);", [profileId], async (err, result) => {
                if (err) throw err;
                console.log('created new cart');
                /* GET CART ID*/
                await connection.query("SELECT * FROM cart WHERE userId = ?;", [profileId], (err, result) => {
                    if (err) throw err;
                    //console.log('Before cartId: '+JSON.stringify(result[0].id));
                    //cartId = result[0].id;
                    //console.log('set cartId in cart creation: '+JSON.stringify(cartId));
                });
            });
        }else{
            console.log('Existing cart found');
            //console.log('Before cartId: '+JSON.stringify(result[0].id));
            //cartId = result[0].id;
            //console.log('set cartId in cart update: '+JSON.stringify(cartId));
        }

        await connection.query("SELECT id FROM cart WHERE userId = ?;", [profileId], (err, result) => {
            console.log(JSON.stringify(result));
            connection.query("INSERT INTO cart_items (cartId, foodItemId, quantity) VALUES (?, ?, ?);", [result[0].id, foodItemId, quantity], (err, result) => {
                if (err) throw err;
                //console.log('Update cart_items Success');
            });
        });
    });
});

router.get('/getCartId', (req, res) => {
    const profileId = req.query.profileId;
    connection.query("SELECT * from cart WHERE userId = ?;",[profileId] , (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.get('/getOrders', (req, res) => {
    const cartId = req.query.cartId;
    connection.query("SELECT cart_items.cartId AS id, cart_items.quantity AS quantity, food_items.name AS name, food_items.price AS price, kitchen.name AS kitchenName, cart.totalPrice AS totalPrice FROM cart_items JOIN food_items ON food_items.id = cart_items.foodItemId JOIN kitchen ON kitchen.id = food_items.kitchenId JOIN cart ON cart.id = cart_items.cartId WHERE cart.id = ?",[cartId] , (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});
module.exports = router; // get cart methods