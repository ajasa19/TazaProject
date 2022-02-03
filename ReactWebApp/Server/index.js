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

const profileKitchenRoute = require("./Routes/profileKitchen") // get profile Kitchen methods
app.use("/profileKitchen", profileKitchenRoute);

const foodItemEditRoute = require("./Routes/foodItemEdit") // get food item edit methods
app.use("/foodItemEdit", foodItemEditRoute);

const kitchenRoute = require("./Routes/kitchen") // get kitchen methods
app.use("/kitchen", kitchenRoute);

const loginRoute = require("./Routes/login") // get login methods
app.use("/login", loginRoute);

const profileRoute = require("./Routes/profile") // get profile methods
app.use("/profile", profileRoute);

const receiptRoute = require("./Routes/receipt")
app.use("/receipt", receiptRoute);

const registerRoute = require("./Routes/register")
app.use("/register", registerRoute);

const adminRoute = require("./Routes/admin") // get admin methods
app.use("/admin", adminRoute);

const profileEditRoute = require("./Routes/profileEdit") // get profileEdit methods
app.use("/profileEdit", profileEditRoute);

const ordersRoute = require("./Routes/orders") // get orders methods
app.use("/orders", ordersRoute);
