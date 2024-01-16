const { User } = require("../model/User");

module.exports.get_all_employees = async (req, res) => {
    try {
        const employeesList = await User.find({currentStatus: true}).sort({name: 1})
        .select("name employeeCode email level department currentStatus fulltime")
        .exec()
        if (employeesList){
            const response = {
                count: employeesList.length,
                employeesList: employeesList.map((employeelist) => {
                    return {
                        name: employeelist.name,
                        employeeCode: employeelist.employeeCode,
                        email: employeelist.email,
                        level: employeelist.level,
                        department: employeelist.department,
                        currentStatus: employeelist.currentStatus,
                        fulltime: employeelist.fulltime
                    }
                })
            }
            res.status(200).json({
                response: response,
                success: true
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
}


module.exports.get_former_employees = async (req, res) => {
    try {
        const formerEmployees = await User.find({currentStatus: false})
        .select("name employeeCode email department currentStatus fulltime endDate")
        .exec()
        if (formerEmployees) {
            const response = {
                count: formerEmployees.length,
                formerEmployees: formerEmployees.map((formerEmployee) => {
                    return {
                        name: formerEmployee.name,
                        employeeCode: formerEmployee.employeeCode,
                        email: formerEmployee.email,
                        department: formerEmployee.department,
                        currentStatus: formerEmployee.currentStatus,
                        fulltime: formerEmployee.fulltime,
                        endDate: formerEmployee.endDate   
                    }
                })
            }
            res.status(200).json({
                response: response
            })
        }
        res.status(401).json({
            message: "No former employees found!"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        })
    };
};

module.exports.delete_employee = async (req, res) => {
    try {
        const employeeId= req.params.employeeId;
        const employee = await User.findOneAndDelete({ _id: employeeId })
        .exec()
        await employee.save();
        if (employee){
        res.status(200).json({
            message: "Employee successfully removed"
        })
        }
        else {
            return res.status(404).json({
                message: "No employees matching this employee ID."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        })
    }
}