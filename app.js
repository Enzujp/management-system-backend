const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const authRoutes = require("./src/routes/authRoutes");
const timeSheetRoutes = require("./src/routes/timeSheetRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");
const productRoutes = require("./src/routes/productRoutes");
const missingItemsRoutes = require("./src/routes/missingItemsRoutes");


// Configs and Db initialization
require("dotenv").config();
connectDB();

// middlewares used
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes to be used
app.use("/user", authRoutes);
app.use("/timesheet", timeSheetRoutes);
app.use("/employees", employeeRoutes); 
app.use("/product", productRoutes);
app.use("/missing-items", missingItemsRoutes);


// start server
app.listen(PORT, () => {
    console.log(`This app runs on port ${PORT}`);
})