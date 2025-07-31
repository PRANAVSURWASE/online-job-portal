let express = require('express');
let router=express.Router();

let hrCtrl=require("../controller/hrController.js");

router.post('/hrRegister', hrCtrl.hrRegister);
router.post('/hrLogin', hrCtrl.hrLogin);
router.post("/createJob", hrCtrl.createJob);
router.get("/listjobs", hrCtrl.listjobs);
router.get("/viewJob/:job_id", hrCtrl.getJobById);
router.post("/deleteJob/:job_id", hrCtrl.deleteJobById);
router.post("/searchJob/:job_name", hrCtrl.searchJobsByName);


module.exports=router;