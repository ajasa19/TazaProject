const express = require("express");
const mysql = require("mysql");
const app = express();
const dobyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

app.use(dobyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var config = require("./../config.js");
var connection = config.connection;

// TO DO:
//router.get('/getKitchenData', (req, res) => {
//    connection.query("SELECT id AS kitchenId, userId AS userId, name AS kitchenName, description AS kitchenDesc FROM kitchen WHERE id = 2", (err, result) => {
//        if (err) throw err;
//        res.send(JSON.stringify(result));
//        console.log(JSON.stringify(result));
//    });
//});

router.get('/get', (req, res) => {
    let id = req.query.userId;
    console.log('passed!');
    console.log('ERRORORORO')
    console.log('receipt is : ',id)
    connection.query("SELECT * FROM testtaza.cart_items JOIN testtaza.cart as a ON a.id = testtaza.cart_items.cartId JOIN testtaza.food_items as b ON b.id = testtaza.cart_items.foodItemId WHERE userId = ? limit 0, 1000;", [id], (err, result) => {
        if (err) { console.log(err.message) };
        res.send(JSON.stringify(result));
        

        console.log('hello');
    
    });
})

module.exports = router;