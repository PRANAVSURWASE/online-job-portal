let scheduleModel = require("../models/scheduleModel.js");

exports.scheduleInterview = (req, res) => {
    let { uid, j_id, date, time, mode, location, meetingLink, notes } = req.body;

    
    if (!mode || mode.trim() === "") {
        mode = "ONLINE";   // default
    }
    if (!location || location.trim() === "") {
        location = mode === "ONLINE" ? "Virtual" : "Office"; // auto adjust
    }
    if (!meetingLink && mode === "ONLINE") {
        meetingLink = "TBD"; // placeholder until HR adds real link
    }
    if (!notes) {
        notes = "No additional notes";
    }

    
    if (!uid || !j_id || !date || !time) {
        return res.status(400).json({ msg: "uid, j_id, date, and time are required" });
    }
    console.log("✅ Validated Data:", { uid, j_id, date, time, mode, location, meetingLink, notes });

    scheduleModel.hasAppliedForJob(uid, j_id)
        .then(hasApplied => {
            if (!hasApplied) {
                return res.status(400).json({ msg: "User has not applied for this job" });
            }
            return scheduleModel.scheduleInterview(uid, j_id, date, time, mode, location, meetingLink, notes);
        })
        .then(result => {
            res.status(201).json({ msg: "Interview scheduled successfully", data: result });
        })
        .catch(err => {
            res.status(500).json({ msg: "Internal server error", error: err.message || err });
        });
};

exports.updateInterviewStatus = (req, res) => {
    let { id, status } = req.body;  
    if (!id || !status) {
        return res.status(400).json({ msg: "Interview ID and status are required" });
    }
    scheduleModel.updateInterviewStatus(id, status)
    .then(result => {
        if (result.affectedRows > 0) {
            res.status(200).json({ msg: "Interview status updated successfully" });
        } else {
            res.status(404).json({ msg: "Interview not found" });
        }
    })  
    .catch(err => {
        res.status(500).json({ msg: "Internal server error", error: err.message || err });
    }); 
};

/**get completed Interview */
exports.getCompletedInterviews = (req, res) => {
    let uid  = req.body;

    if (!uid) {
        return res.status(400).json({ msg: "User ID is required" });
    }

    scheduleModel.getCompletedInterviews(uid)
    .then(result => {
        if (result.length > 0) {
            res.status(200).json({ msg: "Completed interviews fetched successfully", data: result });
        } else {
            res.status(404).json({ msg: "No completed interviews found" });
        }
    })
    .catch(err => {
        res.status(500).json({ msg: "Internal server error", error: err.message || err });
    });
}