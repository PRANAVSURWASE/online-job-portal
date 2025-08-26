let express = require('express');
let router=express.Router();


let contactCtrl = require("../controller/contactController.js");

router.post("/contactUs", contactCtrl.submitContact);


module.exports = router;