let express = require('express');
let router = express.Router();
let jobCtrl = require("../controller/jobController.js");

router.get("/listAllJobs", jobCtrl.viewAllJobs);
router.get("/viewAllCompanies",jobCtrl.viewAllCompanies);



module.exports = router;
