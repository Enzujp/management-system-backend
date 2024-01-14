const mongoose = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcrypt");


module.exports.get_signup = (req, res) => {
    res.send("signup page")
}

module.exports.post_signup = async (req, res) => {
try {
    const { username, email, password } = req.body
} catch (error) {
    console.log(error);
    res.status(500).json({
        error: error.message
    })
}
}

module.exports.get_login = (req, res) => {
    res.send("login page")
}

module.exports.post_login = async (req, res) => {

}