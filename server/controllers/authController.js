const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
var salt = bcrypt.genSaltSync(10);

exports.postRegister = (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (foundUser == undefined) {
            // email is unique, continue creating new user in database
            var hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            await newUser.save();
            res.status(200).send({ status: "ok", message: "Registered successfully." });
        } else {
            // duplicate email found
            res.status(501).send({ status: "error", message: "Duplicate email." });
        }
    });
}

exports.postLogin = (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (foundUser) {
            // email found, now compare password
            console.log("user found, going to compare")
            bcrypt.compareSync(req.body.password, foundUser.password, (err, response) => {
                console.log("comparison done")
                if (response) {
                    // response === true
                    res.status(200).send({ status: "ok", message: "Login successful!" });
                    console.log("password match")
                } else {
                    // response === false
                    res.status(200).send({ status: "error", message: "Wrong password. Please try again." });
                    console.log("password didnt match")
                }
            })
        } else {
            // email not found, please register
            res.status(200).send({ status: "error", message: `User not found. Try <a href="/register">registering</a>` });
        }
    });
}