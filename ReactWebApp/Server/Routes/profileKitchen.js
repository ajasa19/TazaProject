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

//changeCartItemQty
router.post('/changeCartItemQty', (req, res) => {
    const itemId = req.body.itemId;
    const newQuantity = req.body.newQuantity;

    connection.query("UPDATE cart_items SET quantity = ? WHERE id = ?;", [newQuantity, itemId], (err, result) => {
        if (err) throw err;
        res.send("qty update complete");
    });
});

//editKitchen
router.post('/editKitchen', (req, res) => {
    const profileId = req.body.profileId;
    const kitchenName = req.body.kitchenName;
    const kitchenLocation = req.body.kitchenLocation;
    const kitchenDesc = req.body.kitchenDesc;
    const kitchenImgUrl = req.body.kitchenImgUrl;

    var query = connection.query("UPDATE kitchen SET name = ?, location = ?, description = ?, imageURL = ? WHERE userId = ?;", [kitchenName, kitchenLocation, kitchenDesc, kitchenImgUrl, profileId], (err, result) => {
        if (err) throw err;
        //console.log(JSON.stringify(query.sql));
        res.send("edit profile complete");
    });
});

//getKitchenData
router.get('/getKitchenData', (req, res) => {
    const userId = req.query.userId;

    var query = connection.query("SELECT id AS kitchenId, userId AS userId, name AS kitchenName, description AS kitchenDesc, location AS kitchenLocation, imageURL AS kithcenImgUrl FROM kitchen WHERE userId = ?;", [userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

//getKitchenFoodItems
router.get('/getKitchenFoodItems', (req, res) => {
    const kitchenId = req.query.kitchenId;

    var query = connection.query("SELECT id AS foodItemId, name AS foodItemName, description AS fooditemDescription, CONCAT(FORMAT(price, 2)) AS foodItemPrice, imageURL AS foodItemImg FROM food_items WHERE kitchenId = ?;", [kitchenId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

module.exports = router; // get profileKitchen methods