const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");


router.get("/", employeeController.get_all_employees);
router.get("/former-employee", employeeController.get_former_employees);
router.delete("/:employeeId", employeeController.delete_employee);


module.exports = router;
