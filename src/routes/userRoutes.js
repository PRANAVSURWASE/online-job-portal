let express = require('express');
let router= express.Router();

let userController = require('../controller/userController');

router.post('/login', userController.loginUser);
console.log("Inside userRoutes file");



module.exports = router;

