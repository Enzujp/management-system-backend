const mongoose = require("mongoose");

const clockOutSchema = new mongoose.Schema({
    clockOut: {
        type: Date,
        defailt: Date.now()
    },
    employeeId: {
        type: Schema.Types.ObjectId, // might need to come back here for a fix
        ref: "User"
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
})


const ClockOut = mongoose.model("clockout", clockOutSchema);

module.exports = { ClockOut }