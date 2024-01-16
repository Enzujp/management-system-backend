const express = require("express");
const router = express.Router();
const missingItemsControllers = require("../controllers/missingItemsController");

router.post("/", missingItemsControllers.post_add_missing_items);
router.get("/", missingItemsControllers.get_missing_items);

module.exports = router;