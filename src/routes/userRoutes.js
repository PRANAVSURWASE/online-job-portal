let express = require('express');
let router= express.Router();


let userController = require('../controller/userController');
const { authenticateToken, isUser } = require("../middleware/authMiddleware");

router.post("/registerUser", userController.registerUser);
router.get("/profile",authenticateToken,isUser, userController.getUserProfile );
router.put("/updateUser",authenticateToken,userController.updateUser)
router.post("/userRegister",userController.registerUser);
router.post('/applyJob',userController.applyForJob);
router.get('/viewApplicationsHistory/:u_id', userController.viewApplicationsHistory);



module.exports = router;





//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE0LCJuYW1lIjoicCIsImVtYWlsIjoicDRAZ21haWwuY29tIiwiY29udGFjdCI6Ijg5NjY3NjU2MSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU1NzU4ODQxLCJleHAiOjE3NTU4NDUyNDF9.RVPAOUFVlJE_RmEYQWl2f7xNkM5S_tpv0snAGfzv2XI