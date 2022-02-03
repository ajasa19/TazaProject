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

router.get('/getKitchens', (req, res) => {
    connection.query("SELECT kitchen.id, name, profile.id as userId, profile.userName, profile.emailAddress, profile.phoneNumber, kitchen.status FROM kitchen JOIN profile ON profile.id = kitchen.userId;", (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.get('/getDrivers', (req, res) => {
    connection.query("SELECT profile.id, profile.userName, profile.firstName, profile.lastName, profile.emailAddress, profile.phoneNumber, profile.status FROM testtaza.profile WHERE accountTypeId = 2;", (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.get('/getProfiles', (req, res) => {
    connection.query("SELECT profile.id, profile.userName, profile.firstName, profile.lastName, profile.emailAddress, profile.phoneNumber FROM testtaza.profile;", (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

router.delete('/deleteProfile', (req, res) => {
    //console.log("/deleteProfile");
    const id = req.query.Id;
    res.send("DELETE Success");
    // connection.query("DELETE FROM profile WHERE id = ?;",[id], (err, result) => {
    //     if (err) throw err;
    //         res.send("DELETE Success");
    // });
});

module.exports = router;