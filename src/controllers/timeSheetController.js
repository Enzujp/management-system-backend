const { TimeSheet } = require("../model/TimeSheet");
const timeSheetRepository = require("../repositories/timesheetRepositories");


module.exports.post_clockin_clockout = async (req, res) => {
    const employeeId = req.body;
    try {
        const notClockedOut = await TimeSheet.findOne({_id: employeeId}, {clockOut: null}) // findByCLockOut takes in logged in user id
        if (notClockedOut) {
            const newTimeSheet = await TimeSheet.findByIdAndUpdate({_id: notClockedOut.employeeId}, {clockOut: Date.now()});
            return res.status(200).json({
                newTimeSheet: newTimeSheet
            })
        }
        else {
            const newTimeSheet = new TimeSheet(req.user.id)
            res.status(201).json({
                message: "New timesheet has been created!",
                timeSheet: newTimeSheet
            })
        }
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

module.exports.get_timesheet = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

module.exports.get_timesheet_by_id = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

module.exports.get_timesheet_approval = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

module.exports.get_employee_timesheet = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

module.exports.edit_timesheet = async (req, res) => {
    try {
        const id = req.params.employeeId
        const timeSheet = await TimeSheet.findOne({_id: id})
        if (timeSheet){
            const updatedOps = [];
            for (ops of req.body) {
                updatedOps[ops.propName] = ops.value;
            }
            const updatedTimeSheet = await TimeSheet.findByIdAndUpdate({ _id:id }, { $set: updatedOps });
            await updatedTimeSheet.save();
        }
        else {
            return res.status(404).json({
                message: "Could not find any Timesheets matching this employeeId"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            success: false
        })
    }
}

module.exports.get_my_timesheet = async(req, res) => {
    try {
        const id = req.params.employeeId;
        const myTimeSheet = await TimeSheet.findOne({ employeeId: id }).sort({ clockIn: -1 })
        .populate(" emoloyeeId, name employeeCode department fulltime ")
        res.status(200).json({
            message: `Here's employee- ${employeeId}'s Timesheet`,
            timeSheet: myTimeSheet
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            success: false
        })
    }
}