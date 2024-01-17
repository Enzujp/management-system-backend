const mongoose = require("mongoose");

const timeSheetSchema = new mongoose.Schema({
    clockIn: {
        type: Date,
        status: Boolean
    },
    clockOut: {
        type: Date,
        status: Boolean
    },
    status: {
        type: Boolean,
        default: false
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

const TimeSheet = mongoose.model("timesheet", timeSheetSchema);


module.exports = { TimeSheet };