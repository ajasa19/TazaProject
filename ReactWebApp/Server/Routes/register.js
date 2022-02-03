
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

router.post("/", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        connection.query("SELECT COUNT(*) AS total FROM profile WHERE username = ? AND emailAddress = ?", [username, email], (error, result) => {
            if (result[0].total === 0) {
                connection.query("INSERT INTO profile (accountTypeId, userName, firstName, lastName, emailAddress, password, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [0, username, "", "", email, password, "APPROVED"],
                    (err, result) => {
                        if (err) throw err;
                        res.send("OK");
                    }
                );
            }
            else {
                res.send("DUPLICATE");
            }
        });

    }

);

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = router;