const express = require("express");
const app = express();
const authController = require("../controllers/authController");
const cors = require('cors')

app.use(cors());
app.use(express.json());

app
    .route("/register")
    .post(authController.postRegister);

app
    .route("/login")
    .post(authController.postLogin);

app
    .route("/verify")
    .post(authController.postVerify);

module.exports = app;