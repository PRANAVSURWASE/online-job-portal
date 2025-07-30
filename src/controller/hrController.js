let hrModel=require("../models/hrModel");

/**
 * HR Registration
 * Registers a new HR with the provided details.
 */
exports.hrRegister = (req, res) => {    
    let {  name,company_name,password,contact,email } = req.body;
    
    // Validate input
    if (!name || !company_name || !password || !contact || !email) {
        return res.json({ msg: "All fields are required" });
    }

    let promise = hrModel.hrRegister( name,company_name,password,contact,email);
    promise.then((result) => {
        if (result.affectedRows > 0) {
            res.json({ msg: "HR registration successful" });
        } else {
            res.json({ msg: "HR registration failed" });
        }
    }).catch((err) => {
        res.json({ msg: "Internal server Error", error: err.message || err });
    });
}

/**
 * HR Login
 * Authenticates HR using email and password.
 */

exports.hrLogin = (req, res) => {
    let { email, password } = req.body;
    console.log("HR login request received", email, password);
    
    let promise = hrModel.hrLogin(email, password);
    promise.then((result) => {
        if (result.length > 0) {
            res.json({ msg: " HR Login successful" });
        } else {
            res.json({ msg: "Invalid email or password" });
        }
    }).catch((err) => {
        res.json({ msg: "Internal server Error", error: err.message || err });
    });
}

/**
 * Create Job
 * Allows HR to post a new job.
 */
exports.createJob = (req, res) => {
    let { hr_id, j_name,skills } = req.body;
   
    if (!hr_id || !j_name  || !skills ) {
        return res.json({ msg: "All fields are required" });
    }
    
    let promise = hrModel.createJob(hr_id, j_name, skills);
    promise.then((result) => {
        if (result.affectedRows > 0) {
            res.json({ msg: "Job posted successfully" });
        } else {
            res.json({ msg: "Job creation failed" });
        }
    }).catch((err) => {
        res.json({ msg: "Internal server Error", error: err.message || err });
    });
}

/**
 * List Jobs
 * Fetches all jobs posted by HRs.
 */
exports.listjobs = (req, res) => {
    let promise = hrModel.listjobs();
    promise.then((result) => {
        if (result.length > 0) {
            res.json({ msg: "Jobs fetched successfully", data: result });
        } else {
            res.json({ msg: "No jobs found" });
        }
    }).catch((err) => {
        res.json({ msg: "Internal server Error", error: err.message || err });
    });
}