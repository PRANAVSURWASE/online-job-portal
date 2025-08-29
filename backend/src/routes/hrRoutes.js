let express = require('express');
let router=express.Router();

let hrCtrl=require("../controller/hrController.js");
let scheduleCtrl = require("../controller/scheduleController.js");
let {authenticateToken, isHr} = require("../middleware/authMiddleware");

router.post('/hrRegister', hrCtrl.hrRegister)
router.get("/hrProfile", authenticateToken, isHr, hrCtrl.getHrProfile);
router.post("/createJob", hrCtrl.createJob);
router.get("/listjobs", hrCtrl.listjobs);
router.get("/viewJob", hrCtrl.getJobById);
router.delete("/deleteJob/:j_id", hrCtrl.deleteJobById);
router.put('/updateJobById/:j_id', hrCtrl.updateJob);
router.post("/searchJob/:job_name", hrCtrl.searchJobsByName);
router.delete("/deleteJob/:j_id", hrCtrl.deleteJobById)
router.post("/searchJob/:job_name", hrCtrl.searchJobsByName)
router.post('/scheduleInterview', scheduleCtrl.scheduleInterview);
router.post('/completed-interviews',scheduleCtrl.getCompletedInterviews)
router.put('/updateJob/:j_id', scheduleCtrl.updateInterviewStatus)
router.get("/getApplicants",hrCtrl.getJobsAppliedByUser);


module.exports=router;