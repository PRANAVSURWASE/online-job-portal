let userModel = require('../models/userModel');
let applicationModel = require('../models/applicationModel');
let jwt = require('jsonwebtoken');


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

     // Get token from headers
        const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const uid = decoded.uid;   // get user id from token
        console.log("decoded id ",uid);
        const { hr_id, j_id } = req.body;  // these still come from body


    
    // Validate input
    if (!uid ||!hr_id ||!j_id) {
        console.log( uid,hr_id,j_id);
        return res.json({ msg: "User ID and Job ID are required" });
    }
    // Call the model to apply for the job
    let promise=applicationModel.checkAlreadyApplied(uid, j_id)
    promise.then((result) => {
        if(result.length > 0) {
            return res.status(400).json({ msg: "You have already applied for this job" });
        }
         else {
             return  applicationModel.applyForJob(uid,hr_id,j_id)
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
    try {
        // Get token from headers
        const token = req.headers["authorization"]?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }

        // Decode JWT to get user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const uid = decoded.uid;   // Always from token, not params

        // Call model
        applicationModel.viewApplicationsHistory(uid)
            .then(result => {
                if (result.length > 0) {
                    res.status(200).json({ 
                        msg: "Applied jobs fetched successfully", 
                        data: result 
                    });
                } else {
                    res.status(404).json({ msg: "No jobs found for this user" });
                }
            })
            .catch(err => {
                res.status(500).json({ 
                    msg: "Internal server error", 
                    error: err.message 
                });
            });

    } catch (err) {
        res.status(401).json({ msg: "Invalid token", error: err.message });
    }
};

exports.getUserProfile = (req, res) => {
  try {
    
    const user = {
      uid: req.user.uid,
      name: req.user.name,      
      email: req.user.email,
      contact: req.user.contact ,
      skills:req.user.skills,
      education:req.user.education
    };

    res.json({ msg: "Profile loaded successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

exports.updateUser=(req,res)=>{
    const {uid} =req.user;
    const{name,email,contact,password,skills,education}=req.body;

    if(!name||!email||!contact||!password||!skills||!education)
    {
        return res.status(400).json({ msg: "All fields are required" });
    }

    let promise=userModel.updateUser(uid,name,email,contact,password,skills,education);
    promise.then(()=>{
         res.json({
        msg: "Profile updated successfully",
        user: { uid, name, email, contact,password,skills,education}
      })
    })
      .catch((err)=>{
        res.status(500).json({ msg: "DB error", error: err.message || err });
      })

}
