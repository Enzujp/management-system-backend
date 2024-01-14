const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: [ true, "Enter your username"],
        lowercase: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validator: [isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", userSchema);

module.exports = { User }