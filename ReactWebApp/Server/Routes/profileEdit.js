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

//editProfile
router.post('/editProfile', (req, res) => {
    const profileId = req.body.profileId;
    const profileUserName = req.body.profileUserName;
    const profileLastName = req.body.profileLastName;
    const profileFirstName = req.body.profileFirstName;
    const profileEmail = req.body.profileEmail;
    const profileImgUrl = req.body.profileImgUrl;
    const profilePhoneNum = req.body.profilePhoneNum;

    var query = connection.query("UPDATE profile SET userName = ?, lastName = ?, firstName = ?, emailAddress = ?, profilePicUrl = ?, phoneNumber = ? WHERE id = ?;", [profileUserName, profileLastName, profileFirstName, profileEmail, profileImgUrl, profilePhoneNum, profileId], (err, result) => {
        if (err) throw err;
        //console.log(JSON.stringify(query.sql));
        res.send("edit profile complete");
    });
});

//getProfileData
router.get('/getProfileData', (req, res) => {
    const userId = req.query.userId;

    var query = connection.query("SELECT id AS userId, userName AS profileUserName, firstName AS profileFirstName, lastName AS profileLastName, emailAddress AS profileEmail, phoneNumber AS profilePhoneNum, profilePicUrl AS profilePicUrl FROM profile WHERE id = ?;", [userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

//getHeaderImg
router.get('/getHeaderImg', (req, res) => {
    const userId = req.query.userId;

    var query = connection.query("SELECT imageURL from kitchen WHERE userId = ?;", [userId], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
        //console.log(JSON.stringify(query.sql));
        //console.log(JSON.stringify(result));
    });
});

module.exports = router; // get profileEdit methods