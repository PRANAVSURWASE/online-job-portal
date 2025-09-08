let express = require('express');
let router=express.Router();

let hrCtrl=require("../controller/hrController.js");

let {authenticateToken, isHr} = require("../middleware/authMiddleware");

router.post('/hrRegister', hrCtrl.hrRegister)
router.get("/hrProfile", authenticateToken, isHr, hrCtrl.getHrProfile);
router.post("/createJob", hrCtrl.createJob);
router.get("/listjobs", hrCtrl.listjobs);
router.get("/viewJob", hrCtrl.getJobById);
router.delete("/deleteJob/:j_id", hrCtrl.deleteJobById);
router.put('/updateJobById/:j_id', hrCtrl.updateJob);
router.delete("/deleteJob/:j_id", hrCtrl.deleteJobById);
router.post("/searchJob", hrCtrl.searchJobsByName);
router.get("/getApplicants",hrCtrl.getJobsAppliedByUser);
router.delete("/rejectApplication", hrCtrl.deleteApplication);

module.exports=router;