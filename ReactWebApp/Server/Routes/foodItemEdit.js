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

//deleteFoodItem
router.post('/deleteFoodItem', (req, res) => {
    const foodItemId = req.body.foodItemId;

    connection.query("DELETE FROM food_items WHERE id = ?; DELETE FROM food_item_category WHERE foodItemId = ?;", [foodItemId, foodItemId], (err, result) => {
        if (err) throw err;
        res.send("delete item complete");
    });
});

//addFoodItem
router.post('/addFoodItem', (req, res) => {
    const userId = req.body.userId;
    const foodItemName = req.body.foodItemName;
    const foodItemDesc = req.body.foodItemDesc;
    const foodItemImgUrl = req.body.foodItemImgUrl;
    const foodItemPrice = req.body.foodItemPrice;
    const foodItemIngredients = req.body.foodItemIngredients;
    const foodItemCategoryId = req.body.foodItemCategoryId;

    var query = connection.query("INSERT INTO food_items (kitchenId, name, description, imageURL, price, ingredients) VALUES ((SELECT id FROM kitchen WHERE userId = ?), ?, ?, ?, ?, ?); INSERT INTO food_item_category (foodItemId, categoryId) VALUES ((SELECT LAST_INSERT_ID()) , ?);", [userId, foodItemName, foodItemDesc, foodItemImgUrl, foodItemPrice, foodItemIngredients, foodItemCategoryId], (err, result) => {
        if (err) throw err;
        //console.log(JSON.stringify(query.sql));
        res.send("add item complete");
    });
});

//editFoodItem
router.post('/editFoodItem', (req, res) => {
    const foodItemId = req.body.foodItemId;
    const foodItemName = req.body.foodItemName;
    const foodItemDesc = req.body.foodItemDesc;
    const foodItemIngredients = req.body.foodItemIngredients;
    const foodItemImgUrl = req.body.foodItemImgUrl;
    const foodItemPrice = req.body.foodItemPrice;
    const foodItemCategoryId = req.body.foodItemCategoryId;

    var query = connection.query("UPDATE food_items SET name= ?, description = ?, ingredients = ?, imageURL = ? , price = ? WHERE id = ?; UPDATE food_item_category SET categoryId = ? WHERE foodItemId = ?;", [foodItemName, foodItemDesc, foodItemIngredients, foodItemImgUrl, foodItemPrice, foodItemId, foodItemCategoryId, foodItemId], (err, result) => {
        if (err) throw err;
        //console.log(JSON.stringify(query.sql));
        res.send("edit food item complete");
    });
});

//getFoodItemData
router.get('/getFoodItemData', (req, res) => {
    const foodItemId = req.query.foodItemId;

    var query = connection.query("SELECT food_items.id AS foodItemId, name AS foodItemName, description AS fooditemDescription, imageURL AS foodItemImg, CONCAT(FORMAT(price, 2)) AS foodItemPrice, ingredients AS ingredients, categoryId AS categoryId FROM food_items JOIN food_item_category ON food_item_category.foodItemId = food_items.id WHERE food_items.id = ?;", [foodItemId], (err, result) => {
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

module.exports = router; // get foodItemEdit methods