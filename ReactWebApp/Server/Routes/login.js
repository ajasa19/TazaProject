const express = require("express");
//const mysql = require("mysql");
const app = express();
const dobyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

app.use(dobyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

var config = require("./../config.js");
var connection = config.connection;

router.get("/getToken", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const token = generateString(32);
  connection.query(
    "SELECT * FROM testtaza.profile Where userName = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        //User found
        res.send({
          id: result[0].id,
          token: token,
        });

        connection.query(
          "UPDATE profile SET currentToken = ? WHERE id = ?;",
          [token, result[0].id],
          (err, result) => {
            if (err) throw err;
          }
        );
      } else {
        res.send({});
      }
    }
  );
});

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

module.exports = router; // get cart methods
