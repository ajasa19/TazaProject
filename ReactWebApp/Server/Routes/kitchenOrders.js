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

router.get('/getOrderBasic', (req, res) => {
    const userId = req.query.userId;
    var query = connection.query("SELECT DISTINCT `order`.id AS id, customer.userName AS customerUserName, driver.userName AS driverUserName, price AS orderPrice, dropOffLocation, REPLACE(REPLACE(REPLACE(REPLACE(orderStatusId,'0','UNREGISTERED'),'1','COOKING'),'2','PICKUP'),'3','MOVING') AS status, timePlaced AS orderTimeplaced, timeCooked AS orderTimePickup, SUM(quantity) AS orderQty FROM`order` JOIN order_items ON order_items.orderId = `order`.id  JOIN profile AS customer ON customer.id = `order`.userId  LEFT JOIN profile AS driver ON driver.id = `order`.driverId WHERE order_items.kitchenId = (SELECT id FROM kitchen WHERE userId = ?) AND (orderStatusId != 9 AND orderStatusId != 4) GROUP BY `order`.id;", [userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        console.log(JSON.stringify(query.sql));
        console.log(JSON.stringify(result));
    });
});

router.get('/getOrderdFoodItems', (req, res) => {
    const orderId = req.query.orderId;
    const userId = req.query.userId;
    var query = connection.query("SELECT imageURL AS foodItemImg, name AS foodItemName, quantity AS foodItemQty FROM food_items JOIN order_items ON order_items.foodItemId = food_items.id JOIN `order` ON `order`.id = order_items.orderId WHERE `order`.id = ? AND food_items.kitchenId = (SELECT id FROM kitchen WHERE userId = ?);", [orderId, userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
       // console.log(JSON.stringify(query.sql));
       // console.log(JSON.stringify(result));
    });
});

router.get('/getOrderdCustomer', (req, res) => {
    const orderId = req.query.orderId;
    var query = connection.query("SELECT DISTINCT customer.userName AS customerUserName, dropOffLocation, timePlaced AS orderTimeplaced, driver.userName AS driverUserName, timeCooked AS orderTimePickup, REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(orderStatusId,'0','UNREGISTERED'),'1','COOKING'),'2','PICKUP'),'9','REJECTED'),'3','MOVING') AS status FROM`order`  JOIN order_items ON order_items.orderId = `order`.id  JOIN profile AS customer ON customer.id = `order`.userId  LEFT JOIN profile AS driver ON driver.id = `order`.driverId  WHERE`order`.id = ?;", [orderId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
       // console.log(JSON.stringify(result));
    });
});

//changeOrderStatus
router.post('/changeOrderStatus', (req, res) => {
    const orderId = req.body.orderId;
    const newStatus = req.body.newStatus;

    var query = connection.query("UPDATE `order` SET orderStatusId = ? WHERE `order`.id = ?; UPDATE `order` SET timeCooked = NOW() WHERE `order`.id = ? AND orderStatusId = 2; UPDATE `order` SET timeCooked = NULL WHERE `order`.id = ? AND orderStatusId = 1 OR orderStatusId = 9 OR orderStatusId = 0 ", [newStatus, orderId, orderId, orderId], (err, result) => {
        if (err) throw err;
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

module.exports = router;