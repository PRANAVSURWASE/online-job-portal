let scheduleModel = require("../models/scheduleModel.js");
const jwt = require("jsonwebtoken");

exports.scheduleInterview = (req, res) => {
    let { uid, j_id, date, time, mode, location, meetingLink, notes } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "No token provided" });
    }
    let hr_id;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔍 Decoded Token:", decoded);
        hr_id = decoded.id;   
    } catch (err) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
    if (!mode || mode.trim() === "") mode = "ONLINE";
    if (!location || location.trim() === "") location = mode === "ONLINE" ? "Virtual" : "Office";
    if (!meetingLink && mode === "ONLINE") meetingLink = "TBD";
    if (!notes) notes = "No additional notes";
    if (!uid || !j_id || !date || !time) {
        return res.status(400).json({ msg: "uid, j_id, date, and time are required" });
    }
    console.log("✅ Validated Data:", { uid, j_id, date, time, mode, location, meetingLink, notes, hr_id });
    scheduleModel.hasAppliedForJob(uid, j_id)
        .then(hasApplied => {
            if (!hasApplied) {
                return res.status(400).json({ msg: "User has not applied for this job" });
            }
            return scheduleModel.scheduleInterview(
                uid, j_id, date, time, mode, location, meetingLink, notes, hr_id
            );
        })
        .then(result => {
            res.status(201).json({ msg: "Interview scheduled successfully", data: result });
        })
        .catch(err => {
            console.error("❌ Error scheduling interview:", err);
            res.status(500).json({ msg: "Internal server error", error: err.message || err });
        });
};



exports.getScheduledInterviews = (req, res) => {
    try {
        
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }

        
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(403).json({ msg: "Invalid token" });
        }

        const hr_id = decoded.id; // using decoded.id as HR ID

       
        scheduleModel.getScheduledInterviewsByHr(hr_id)
            .then(result => {
                if (result.length > 0) {
                    res.status(200).json({ msg: "Scheduled interviews fetched successfully", data: result });
                } else {
                    res.status(404).json({ msg: "No scheduled interviews found" });
                }
            })
            .catch(err => {
                res.status(500).json({ msg: "Internal server error", error: err.message || err });
            });

    } catch (err) {
        res.status(500).json({ msg: "Token verification failed", error: err.message });
    }
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