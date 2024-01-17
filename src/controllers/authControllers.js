const mongoose = require("mongoose");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const createToken = require("../../config/token");


module.exports.get_signup = (req, res) => {
    res.send("signup page")
}

module.exports.post_signup = async (req, res) => {
try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username: username })
    if (existingUser) {
        res.status(409).json({
            message: "Username taken, try another"
        })
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        // create new user
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            username: username,
            email: email,
            password: hashedPassword
        })
        // create user token
        const userToken = createToken(username);
        await user.save();

        res.status(201).json({
            message: "User created successfully!",
            token: userToken,
            email: email,
            password: hashedPassword
        })
    }
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
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (user) {
            // compare inputed password to password in db
            const verifyPassword = await bcrypt.compare(password, user.password);

            if (verifyPassword) {
                const userToken = createToken(username);
                return res.status(200).json({
                    message: "User logged in successfully",
                    user: user,
                    _token: userToken
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports.delete_user = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOneAndDelete({_id: userId})
        .exec()
        await user.save();
        if (user) {
            res.status(200).json()
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}