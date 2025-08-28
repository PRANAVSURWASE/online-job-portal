let express = require('express');
let router= express.Router();


let userController = require('../controller/userController');
const { authenticateToken, isUser } = require("../middleware/authMiddleware");

router.post("/registerUser", userController.registerUser);
router.get("/profile",authenticateToken,isUser, userController.getUserProfile );
router.put("/updateUser",authenticateToken,userController.updateUser)
router.post("/userRegister",userController.registerUser);
router.post('/applyJob',userController.applyForJob);
router.get('/viewApplicationsHistory', userController.viewApplicationsHistory);



module.exports = router;




