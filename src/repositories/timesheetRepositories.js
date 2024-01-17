const TimeSheet = require("../model/TimeSheet");

module.exports.createTimesheet = async (id) => {
    return await TimeSheet.create({
        employeeId: id,
        clockIn: Date.now(),
        clockOut: null
    });
}

module.exports.edit = async (id) => {
    return await TimeSheet.findByIdAndUpdate({ _id: id }, { clockOut: Date.now() }, {new: true});
}


module.exports.findByClockOutStatus = async (id) => {
    return await TimeSheet.findOne({ employeeId: id, clockOut: null });
}