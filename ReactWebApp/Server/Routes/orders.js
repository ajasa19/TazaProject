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

router.get('/getOrderId', (req, res) => {
    const userId = req.query.userId;
   console.log('USERIFDDD => ',userId)
    // Getting the orderId from the order table using userId.
    connection.query("SELECT * FROM `order` WHERE userId = ?", [
        userId
    ], (err, result) => {
        if (err) { console.log(err.message) };
        res.send(JSON.stringify(result)); // result get orderId
     
    });
})

router.get('/getItems', (req, res) => {
    let userId = req.query.userId
    console.log('userdi =', userId)
    //Join tables of cart and cart_items to get quantity and foodItemId for the order_items table
    connection.query("SELECT * FROM testtaza.cart INNER JOIN testtaza.cart_items ON testtaza.cart_items.cartId = testtaza.cart.id where userId = ?;"
        , [userId], (err, result) => {
            res.send(JSON.stringify(result)); // get the foodItemd and quantity
            
        })
})



router.post('/addItems', (req, res) => {
    const orderId = req.body.orderId;
    const foodItemId = req.body.foodItemId;
    const quantity = req.body.quantity;
   
    console.log('ORDER ID /addItems => ', orderId)
    console.log('ORDER ID /addItems => ', quantity)
    console.log('ORDER ID /addItems => ', foodItemId)


    connection.query("INSERT INTO `order_items` ( `orderId`, `foodItemId`, `quantity`) VALUES ( ?, ?, ?)", [
        orderId, foodItemId, quantity
    ], (err, result) => {
        if (err) { console.log(err.message) };
        res.send(JSON.stringify(result));
        

    });
})


router.post('/addOrder', (req, res) => {
    const userId = req.body.userId;
    const totalPrice = req.body.totalPrice;
    const address = req.body.address;
    const currentTime = req.body.currentTime;

    console.log('Address: ', address)

    console.log('passedadkmdwkmd! ', userId);
    connection.query("INSERT INTO `order` ( `userId`, `driverId`, `price`, `orderStatusId`, `pickUpLocation`, `dropOffLocation`, `timePlaced`, `timeCooked`) VALUES ( ?, ?, ?, ?, ?, ?, CURRENT_TIME(), ?)", [
    userId, 0, totalPrice, 0, 'kitchen', address, '0'
    ], (err, result) => {
        if (err) { console.log(err.message) };
        res.send(JSON.stringify(result));
        // INSERT INTO `testtaza`.`order` (`id`, `userId`, `driverId`, `price`, `orderStatusId`, `pickUpLocation`, `dropOffLocation`, `timePlaced`, `timeCooked`) VALUES ('1', '80', '0', '20', '0', '3', '3', '3', '3');

        console.log('in orders table');

        //connection.query('DELETE FROM `cart` WHERE (`userId` = ?', [userId], (err, result) => {
        //    if (err) { console.log(err.message); }
        //    console.log('2nd query completed!')

        //    connection.query('DELETE FROM `cart_items` WHERE (`userId` = ?', [userId], (err, result) => {
        //        if (err) { console.log(err.message); }
        //        console.log('2nd query completed!')
        //    })
        //})

    });
})

router.get('/getCartId', (req, res) => {
    const userId = req.query.userId;
    console.log("ID FROM ORDERS.daJS => ", userId)
    connection.query("SELECT * FROM cart WHERE userId = ?", [userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.delete('/deleteCartId', (req, res) => {
    const id = req.query.id;
    console.log("DELETE CART ID => ", id)
    connection.query("DELETE from cart WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        console.log('Successful deletion fromcart')
        res.send(JSON.stringify(result));
    });

   
});

router.delete('/deleteCartItemsId', (req, res) => {
    const id = req.query.id;
    console.log("DELETE CART ID => ", id)
    connection.query("DELETE from cart_items WHERE cartId = ?", [id], (err, result) => {
        if (err) throw err;
        console.log('Successful deletion fromcart')
        res.send(JSON.stringify(result));
    });


});


router.get('/getProfile', (req, res) => {
    const id = req.query.userId;
    console.log("ID FROM ORDERS.JS => ", id)
    connection.query("SELECT * FROM profile WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

module.exports = router;