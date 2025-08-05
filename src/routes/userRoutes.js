let express = require('express');
let router= express.Router();

let userController = require('../controller/userController');

router.post('/login', userController.loginUser);
router.post("/userRegister",userController.registerUser);
router.post('/applyJob/:j_id',userController.applyForJob);
router.get('/viewApplicationsHistory', userController.viewApplicationsHistory);


module.exports = router;

