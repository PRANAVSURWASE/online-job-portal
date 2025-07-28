let express = require('express');
let router=express.Router();

let adminCtrl=require("../controller/adminController.js");

router.post("/validateAdmin",adminCtrl.adminLogin);

module.exports=router;