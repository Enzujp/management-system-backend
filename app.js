const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const authRoutes = require("./src/routes/authRoutes");


// Configs and Db initialization
require("dotenv").config();
connectDB();

// middlewares used
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes to be used
app.use("/user", authRoutes);


// start server
app.listen(PORT, () => {
    console.log(`This app runs on port ${PORT}`);
})