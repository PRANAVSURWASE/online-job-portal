let userModel = require('../models/userModel');

exports.loginUser = (req, res) => {

    console.log("userController.loginUser triggered");

    let{ email, password } = req.body;
    console.log(email, password  );
    
    let promise = userModel.loginUser(email, password);
    promise.then((result) => {
        if (result.length > 0) {
            res.json({
                message: "Login successful" });
        } else {  
            res.json({
                message: "Invalid email or password" });
        } 
    }).catch((err) => {
        res.json({
            message: "Internal server error",
            error: err.message || err });
    })
}  