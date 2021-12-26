const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    message: { type: String, required: true}
});

const User = new mongoose.model("User", userSchema);

module.exports = User;