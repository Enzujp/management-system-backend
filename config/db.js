const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURI)
        .then(
            console.log(`Connected to database on port ${PORT}`)
        )
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = connectDB;