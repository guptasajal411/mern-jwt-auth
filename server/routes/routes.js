const express = require("express");
const app = express();
const authController = require("../controllers/authController");

app
    .route("/register")
    .post(authController.postRegister);

module.exports = app;