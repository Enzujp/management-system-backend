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
    
    employeeCode: {
        type: Number,
        required: true,
        unique: true
    },
    
    level: {
        type: String,
        enum: ["admin", "supervisor", "user"]
    },
    
    department: {
        type: String,
        enum : ["generic", "production", "molding", "packing", "flowwrap", "warehouse"]
    },
    
    comments: {
        type: String,
        imageUrl: {
            type: String,
            default: ""
        }
    
    },
    
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    
    startingDate: {
        type: String,
        required: true
    },
    
    currentStatus :{
        type: Boolean,
        default: false
    },
    
    fulltime: {
        type: Boolean,
        default: true
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