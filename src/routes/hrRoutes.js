let express = require('express');
let router=express.Router();

let hrCtrl=require("../controller/hrController.js");

router.post('/hrRegister', hrCtrl.hrRegister);
router.post('/hrLogin', hrCtrl.hrLogin);
router.post("/createJob", hrCtrl.createJob);
router.get("/listjobs", hrCtrl.listjobs);
module.exports=router;