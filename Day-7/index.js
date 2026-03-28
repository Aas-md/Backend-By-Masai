let express = require("express");
let mongoose = require("mongoose");
let connectToDB = require("./mongoConfig");
let userRoute = require("./userRoute");
let orderRoute = require("./orderRoute");
require('dotenv').config();

let app = express();
app.use(express.json());
connectToDB();
app.use('/users',userRoute);
app.use('/orders',orderRoute);

app.listen(3000, async () => {

    console.log("Server is running at port 3000");
})

app.get("/", (req, res) => {
    res.send("Hello World");
})