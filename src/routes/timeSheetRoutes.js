const express = require("express");
const router = express.Router();
const timeSheetController = require("../controllers/timeSheetController");

router.post("/clockin-clockout", timeSheetController.post_clockin_clockout);
router.get("/", timeSheetController.get_timesheet);
router.get("/:id", timeSheetController.get_timesheet_by_id);
router.put("/approval", timeSheetController.get_timesheet_approval);
router.get("/employee/:id", timeSheetController.get_employee_timesheet);
router.put("/edit/:id", timeSheetController.edit_timesheet);
router.get("/my-timesheet", timeSheetController.get_my_timesheet);



module.exports = router;