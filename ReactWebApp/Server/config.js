
const mysql = require("mysql");
var config = {
    host: "tazadb.mysql.database.azure.com",
    user: "tazaAdmin@tazadb",
    password: "TazaLastW00",
    database: "testtaza",
    port: 3306,
    multipleStatements: true,
    ssl: true
}

var pool = mysql.createConnection({
    connectionLimit: 1000,
    host: "tazadb.mysql.database.azure.com",
    user: "tazaAdmin@tazadb",
    password: "TazaLastW00",
    database: "testtaza",
    port: 3306,
    ssl: true
});

const connection = new mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log("pool connection established");
        console.log("DB: " + config.host);
    }
})


module.exports = {
    connection: mysql.createConnection(config)
}