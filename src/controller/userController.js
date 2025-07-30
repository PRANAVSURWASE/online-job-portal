let userModel = require('../models/userModel');

/**
 * User Login
 * Authenticates user using email and password.
 */
exports.loginUser = (req, res) => {
   
    let{ email, password } = req.body;
    
    // Call the model to check credentials
    let promise = userModel.loginUser(email, password);
    promise.then((result) => {
        if (result.length > 0) {
            // User found, login successful
            res.json({
                message: "Login successful" });
        } else { 
            // User not found, invalid credentials 
            res.json({
                message: "Invalid email or password" });
        } 
    }).catch((err) => {
         // Handle database or server errors
        res.json({
           
            error: err.message || err });
    })
} 
/**
 * User Registration
 * Registers a new user with the provided details.
 */
exports.registerUser = (req, res) => {
     let { name, email, contact, password } = req.body;

      // Validate input fields
    if (!name || !email  || !contact|| !password) {
        return res.json({
            message: "All fields are required" });
    }

    // Call the model to register the user
    let promise=userModel.registerUser(name, email, contact, password);
    promise.then((result) => {  
        
        
        if(result.affectedRows>0)
        {
             // Registration successful
            res.json({msg:"User Registered Sucessfully"});

        }
        else{
            // Registration failed
            res.json({ msg: "User registration failed" });
        }
    }).catch((err)=>
        {
            // Handle database or server errors
        res.json({msg: "Internal server Error", error: err.message || err});
    });
}
