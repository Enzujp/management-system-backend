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
        if (!startDate || !endDate) {
            return res.status(400).json({message: "Missing start or end date"})
          }
          const clockInOutTimesheet = await Timesheet.aggregate([
            {
              $match: {
                clockIn: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
                },
              },
            },
            {
              $group: {
                _id: "$employeeId",
                count: {
                  $sum: 1
                },
                totalHours: {
                  $sum: {
                    $divide: [{
                      $subtract: ["$clockOut", "$clockIn"]
                    }, 1000 * 60 * 60 ]      
                  }
                }
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "employee"
              }
            },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    {
                      $first: "$employee"
                    },
                    "$$ROOT"
                  ]
                }
              }
            }, 
            {
              $unset: "employee"
            },
            {
              $sort: {
                department: 1 , name: 1
              }
            }
        ]) 
      
        clockInOutTimesheet.map(singleClockInOutTimesheet => { 
      
            if (singleClockInOutTimesheet.fulltime === true) {
              singleClockInOutTimesheet.totalHours -= 0.5 * singleClockInOutTimesheet.count 
              let hour = parseInt(Number(singleClockInOutTimesheet.totalHours))
              let minutes = Math.round((Number(singleClockInOutTimesheet.totalHours)-hour) * 60)
              if (minutes >= 60) {
                hour += 1
                minutes -= 60
              }
              singleClockInOutTimesheet.totalHours = `${hour}:${minutes}`
      
              if (singleClockInOutTimesheet.totalHours.split(':')[1] === "0") {
                singleClockInOutTimesheet.totalHours = `${hour}:00`
              } 
      
              if (singleClockInOutTimesheet.totalHours.split(':')[1].length === 1 && singleClockInOutTimesheet.totalHours.split(':')[1]!== "0" ) {
                singleClockInOutTimesheet.totalHours = `${hour}:0${minutes}`
              }
      
            } else if (singleClockInOutTimesheet.fulltime === false) {
              singleClockInOutTimesheet.totalHours += 0.25 * singleClockInOutTimesheet.count
              let hour = parseInt(Number(singleClockInOutTimesheet.totalHours))
              let minutes = Math.round((Number(singleClockInOutTimesheet.totalHours)-hour) * 60)
              singleClockInOutTimesheet.totalHours = `${hour}:${minutes}`
      
              if (singleClockInOutTimesheet.totalHours.split(':')[1] === "0") {
                singleClockInOutTimesheet.totalHours = `${hour}:00`
              }
      
              if (singleClockInOutTimesheet.totalHours.split(':')[1].length === 1 && singleClockInOutTimesheet.totalHours.split(':')[1]!== "0" ) {
                singleClockInOutTimesheet.totalHours = `${hour}:0${minutes}`
              }
            } 
            return singleClockInOutTimesheet
        })
        return res.status(200).json(clockInOutTimesheet);
        
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
        const id = req.params.id;
        const {startDate, endDate} = req.query;

        let query = { employeeId: id }

        if (startDate && endDate) {
            query.clockIn = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }

        const timesheetId = await TimeSheet.find(query).sort({ clockIn: -1 })
        .populate(" employeeId, name employeeCode department fulltime status ")
        if (timesheetId) {
        res.status(200).json({
            success: true,
            timesheetId: timesheetId
        })
        }
        else {
            return res.status(404).json({
                message: "Timesheet not found!"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

module.exports.put_timesheet_approval = async (req, res) => {
    try {
        const { ids } = req.body;
        const timeSheetApproval = await TimeSheet.updateMany({_id: {$in: ids}, status: false}, {status: true})
        res.status(200).json({
            message: "Approved!",
            timeSheetApproval: timeSheetApproval
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Try reloading the page"
        })
    }
}

module.exports.get_employee_timesheet = async (req, res) => {
    try {
        const id = req.params.employeeId;
        const timeSheet = await TimeSheet.findOne({ employeeId: id })
        if (timeSheet){
            res.status(200).json({
                message: `Timesheet for employee- ${employeeId}`,
                timeSheet: timeSheet
            })
        }
        else {
            res.status(404).json({
                message: "Error! Could not find a timesheet for this employeeId."
            })
        }

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
        const id = req.user.id
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