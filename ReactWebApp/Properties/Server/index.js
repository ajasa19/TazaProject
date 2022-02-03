const express = require("express");
const app = express();
const dobyParser = require('body-parser');
const cors = require('cors');

app.use(dobyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port);
console.log("running on port " + port);

const cartRoute = require("./Routes/cart") // get cart methods
app.use("/cart", cartRoute);

const kitchenRoute = require("./Routes/kitchen") // get kitchen methods
app.use("/kitchen", kitchenRoute);

const loginRoute = require("./Routes/login") // get login methods
app.use("/login", loginRoute);

const profileRoute = require("./Routes/profile") // get profile methods
app.use("/profile", profileRoute);