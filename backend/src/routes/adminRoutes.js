let express = require('express');
let router=express.Router();
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

let adminCtrl=require("../controller/adminController.js");

router.get("/adminProfile",authenticateToken, isAdmin, adminCtrl.getAdmin)
router.get("/stats", authenticateToken, isAdmin, adminCtrl.getAdminStats);
router.get("/viewHR", adminCtrl.viewHR);
router.post("/deleteHR/:hr_id", adminCtrl.deleteHR);
router.put("/updateHR", adminCtrl.updateHR);
router.post("/addHR",adminCtrl.addHR);
router.get("/viewEnquiry", adminCtrl.viewEnquiry);
router.delete("/deleteEnquiry/:enquiry_id", adminCtrl.deleteEnquiry);
module.exports=router;