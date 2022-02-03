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

//getTrips
router.get('/getTrips', (req, res) => {
    const tripId = req.query.tripId;
    connection.query("SELECT trips.id AS tripsId, trips.buyeruserId AS buyeruserId,kitchen.id AS kitchenId, order.id AS orderId, order.userId AS userIdprofile.userName AS userName, kitchen.userId AS kitchenUserId,order.pickUpLocation AS pickUpLocation,order.dropOffLocation AS dropOffLocation,FROM trips JOIN kitchen ON kitchen.userId  = trips.kitchenuserId JOIN order ON order.id = trips.orderId WHERE cart.id = ?JOIN order ON order.userId = trips.buyeruserId;",[tripId] , (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});