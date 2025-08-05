let userModel = require('../models/userModel');
let applicationModel = require('../models/applicationModel');
let jwt = require('jsonwebtoken');

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
            let user = result[0];

            // Generate JWT token
            let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h' // Token valid for 1 hour   
            });
            // User found, login successful
            res.json({
                message: "Login successful" ,
                token : token,});
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
     console.log("name, email, contact, password", name, email, contact, password);
     

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
//** * Apply for Job
/**
 * Allows a user to apply for a job.
 */


exports.applyForJob = (req, res) => {
    let { u_id, j_id } = req.body;

    // Validate input
    if (!u_id || !j_id) {
        return res.json({ msg: "User ID and Job ID are required" });
    }

    // Call the model to apply for the job
    let promise=applicationModel.checkAlreadyApplied(u_id, j_id)
    promise.then((result) => {
        if(result.length > 0) {
            return res.status(400).json({ msg: "You have already applied for this job" });
        }
         else {
             return  applicationModel.applyForJob(u_id, j_id)
             .then(()=> {
                // Job application successful
                res.status(200).json({ msg: "Job application successful" });
             });
            
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server Error", error: err.message || err });
    });
};

/**
 * View Applied Jobs
 * Retrieves all jobs applied by the user.
 */
exports.viewApplicationsHistory = (req, res) => {   
    let { u_id } = req.body;

    // Validate input
    if (!u_id) {
        return res.json({ msg: "User ID is required" });
    }

    // Call the model to get applied jobs
    let promise = applicationModel.viewApplicationsHistory(u_id);
    promise.then((result) => {
        if (result.length > 0) {
            res.status(200).json({ msg: "Applied jobs fetched successfully", data: result });
        } else {
            res.status(404).json({ msg: "No jobs found for this user" });
        }
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
}