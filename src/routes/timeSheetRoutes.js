const express = require("express");
const router = express.Router();
const timeSheetConttroller = require("../controllers/timeSheetController");

router.post("/clockin-clockout", timeSheetConttroller.post_clockin_clockout);
router.get("/", timeSheetConttroller.get_timesheet);
router.get("/:id", timeSheetConttroller.get_timesheet_by_id);
router.put("/approval", timeSheetConttroller.get_timesheet_approval);
router.get("/employee/:id", timeSheetConttroller.get_employee_timesheet);
router.put("/edit/:id", timeSheetConttroller.edit_timesheet);
router.get("/my-timesheet", timeSheetConttroller.get_my_timesheet);



module.exports = router;