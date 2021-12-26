const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.postRegister = (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (foundUser == undefined) {
            // email is unique, continue creating new user in database
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    // Store hash in your password DB.
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    });
                    await newUser.save();
                    res.status(200).send({ status: "ok", message: "Registered successfully." });
                });
            });
        } else {
            // duplicate email found
            res.status(501).send({ status: "error", message: "Duplicate email." });
        }
    });
}

exports.postLogin = (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (foundUser) {
            // user found, now compare password
            bcrypt.compare(req.body.password, foundUser.password, (err, response) => {
                if (response) {
                    // create json web token
                    const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SIGN_KEY);
                    // response === true
                    res.status(200).send({ status: "ok", message: "Login successful, redirecting...", token });
                } else {
                    // response === false
                    res.status(200).send({ status: "error", message: "Wrong password. Please try again." });
                }
            });
        } else {
            // email not found, please register
            res.status(200).send({ status: "error", message: "User not found. Try registering." });
        }
    });
}