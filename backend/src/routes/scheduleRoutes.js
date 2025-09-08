let express = require('express');
let router=express.Router();
let scheduleCtrl = require("../controller/scheduleController.js");

router.post('/scheduleInterview', scheduleCtrl.scheduleInterview);
router.get('/getScheduledInterviews', scheduleCtrl.getScheduledInterviews);   
router.post('/completed-interviews',scheduleCtrl.getCompletedInterviews);
router.put('/updateJob/:j_id', scheduleCtrl.updateInterviewStatus);


module.exports = router;