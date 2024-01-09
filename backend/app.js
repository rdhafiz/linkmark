const express = require("express");
const cors = require("cors");
require("./config/db");
// imported route goes here
const router = require("./routes/route");

// initialize express
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Need to use all route of the app
app.use("", router);

// app.get('/', (req, res) => {
//     res.send('Welcome to tketch server');
// })

// route not found error
app.use((req, res, next) => {
    res.status(404).json({
        message: "route not found",
    });
});

//handling server error
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "server error",
    });
});

module.exports = app;