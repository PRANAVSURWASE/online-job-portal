let express = require('express');
let router= express.Router();

let userController = require('../controller/userController');

router.post('/login', userController.loginUser);
router.post("/userRegister",userController.registerUser);


module.exports = router;

