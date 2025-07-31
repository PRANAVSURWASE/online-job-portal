let express = require('express');
let router=express.Router();

let adminCtrl=require("../controller/adminController.js");

router.post("/validateAdmin",adminCtrl.adminLogin);
router.get("/viewHR", adminCtrl.viewHR);
router.post("/deleteHR", adminCtrl.deleteHR);
router.put("/updateHR", adminCtrl.updateHR);
router.post("/addHR",adminCtrl.addHR);

module.exports=router;