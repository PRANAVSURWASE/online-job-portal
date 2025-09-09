let hrModel = require("../models/hrModel");
let applicationModel = require("../models/applicationModel");
let jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');
/**
 * HR Registration
 * Registers a new HR with the provided details.
 */
exports.hrRegister = (req, res) => {
  let { name, company_name, password, contact, email } = req.body;
  // Validate input
  if (!name || !company_name || !password || !contact || !email) {
    return res.json({ msg: "All fields are required" });
  }
  let promise = hrModel.hrRegister(name,company_name,password,contact,email);
  promise.then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json({ msg: "HR registration successful" });
      } else {
        res.json({ msg: "HR registration failed" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Internal server Error", error: err.message || err });
    });
};

exports.getHrProfile = (req, res) => {
  try {
    const hr = {
      id: req.user.id,
      name: req.user.name,
      company_name: req.user.company_name,
      contact: req.user.contact,
      email: req.user.email,
    };
    res.json({ msg: "hr Profile Loaded successfully", hr });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

/**
 * Create Job
 * Allows HR to post a new job.
 */
exports.createJob = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const hr_id = decoded.id; // Extract HR ID from token
  const { j_name, skills, location } = req.body;
    if (!j_name || !location || !skills) {
      return res.status(400).json({ msg: "All fields are required" });
    }
  // format date as YYYY-MM-DD
    const posted_date = new Date().toISOString().slice(0, 10);
    let promise = hrModel.createJob(hr_id, j_name, skills, location, posted_date);
    promise
      .then((result) => {
        res.status(201).json({
          msg: "Job created successfully",
          job: { j_id: result.insertId, hr_id, j_name, skills, location, posted_date: new Date().toISOString().slice(0, 10) },
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ msg: "Internal server error", error: err.message || err });
      });
  } catch (err) {
    res.status(500).json({ msg: "Token error", error: err });
  }
};

/**
 * List Jobs
 * Fetches all jobs posted by HRs.
 */
exports.listjobs = (req, res) => {
  let promise = hrModel.listjobs();
  promise
    .then((result) => {
      if (result.length > 0) {
        res.json({ msg: "Jobs fetched successfully", data: result });
      } else {
        res.status(200).json({ msg: "No jobs found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Internal server Error", error: err.message || err });
    });
};

exports.getJobById = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const hr_id = decoded.id;
  if (!hr_id) {
    return res.json({ msg: "Job ID is required" });
  }

  let promise = hrModel.getJobById(hr_id);
  promise
    .then((result) => {
      if (result.length > 0) {
        res
          .status(200)
          .json({ msg: "Job details fetched successfully", data: result });
      } else {
        res.status(200).json({ msg: "No job found with the given ID" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Internal server Error", error: err.message || err });
    });
};

exports.deleteJobById = (req, res) => {
  let { j_id } = req.params;
  j_id = parseInt(j_id, 10);
  if (isNaN(j_id)) {
    return res.json({ msg: "Job ID is required" });
  }
  let promise = hrModel.deleteJobById(j_id);
  promise
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json({ msg: "Job deleted successfully" });
      } else {
        res.status(200).json({ msg: "No job found with the given ID" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Internal server Error", error: err.message || err });
    });
};


exports.updateJob = (req, res) => {
  let { j_id } = req.params;
  j_id = parseInt(j_id, 10);
  if (!j_id) {
    return res.status(400).json({ msg: "Job ID is required" });
  }
 let { j_name, skills, location } = req.body;
  //console.log("job=>"+j_name, "skills=>"+skills,"location=>" +location);

  if (!j_name || !skills || !location) {
    return res
      .status(400)
      .json({ msg: "All fields (j_name, skills, location) are required" });
  }
  let promise = hrModel.updateJobById(j_id, { j_name, skills, location });
  promise
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json({ msg: "Job updated successfully" });
      } else {
        res.status(404).json({ msg: "No job found with the given ID" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Internal Server Error", error: err.message || err });
    });
};


exports.searchJobsByName = (req, res) => {
  let { j_name } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const hr_id = decoded.id;
  if (!hr_id) {
    return res.status(401).json({ msg: "HR ID not found" });
  }
  if (!decoded || !decoded.id) {
    return res.status(403).json({ msg: "Invalid token" });
  }
  // Validate input
  if (!j_name) {
    return res.status(400).json({ msg: "Job name is required" });
  }
  let promise = hrModel.searchJobsByName(j_name,hr_id);
  promise
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({ msg: "Jobs found", data: result });
      } else {
        res.status(404).json({ msg: "No jobs found with the given name" });
      }
    })
    .catch((err) => {
      res.status(500)
        .json({ msg: "Internal server Error", error: err.message || err });
    });
};

exports.getJobsAppliedByUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const hr_id = decoded.id; // Extract HR ID from the token
  let promise = applicationModel.getJobsAppliedByUser(hr_id);
  promise
    .then((result) => {
      res.status(201).json({
        msg: "Applied users fetched successfully",
        apply_jobs: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ msg: "Internal server error", error: err.message || err });
    });
};



exports.downloadResume = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const filename = req.params.filename;
    // Construct the full file path (adjust path according to your file storage)
    const filePath = path.join(__dirname, '../../uploads/resumes', filename);
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ msg: "Resume file not found" });
    }
    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    // Send file
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ msg: "Error downloading resume" });
      }
    });
    
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ msg: "Invalid token" });
  }
};

exports.deleteApplication = (req, res) => {
  let { uid, j_id } = req.body;
  if (!uid || !j_id) {
    return res.status(400).json({ msg: "User ID and Job ID are required" });
  }
  let promise = applicationModel.deleteApplication(uid, j_id);
  promise
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json({ msg: "Application rejected successfully" });   
      } else {
        res.status(404).json({ msg: "No application found with the given User ID and Job ID" });
      } 
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "Internal server Error", error: err.message || err });
        console.log(err);
        
    });
};