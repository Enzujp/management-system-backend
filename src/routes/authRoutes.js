const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers")


router.get("/signup", authControllers.get_signup);
router.post("/signup", authControllers.post_signup);
router.get("/login", authControllers.get_login);
router.post("/login", authControllers.post_login);
router.delete("/:userId", authControllers.delete_user);

module.exports = router;