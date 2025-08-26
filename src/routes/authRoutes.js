const express = require("express");
const { login } = require("../controller/authController.js");
const { authenticateToken, isAdmin, isUser } = require("../middleware/authMiddleware");
const authController = require("../controller/authController.js");


const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/hrLogin", authController.loginHr);
router.post("/adminLogin",authController.loginAdmin)


router.get("/admin-dashboard", authenticateToken, isAdmin, (req, res) => {
  res.json({ msg: "Welcome Admin Dashboard", user: req.user });
});

router.get("/user-dashboard", authenticateToken, isUser, (req, res) => {
  res.json({ msg: "Welcome User Dashboard", user: req.user });
});

module.exports = router;
