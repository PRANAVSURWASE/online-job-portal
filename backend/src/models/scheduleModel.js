let db = require("../../db.js");

exports.hasAppliedForJob = (uid, j_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from apply_jobs where u_id = ? AND j_id = ?", 
        [uid, j_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

exports.scheduleInterview = ( uid,j_id,date,time,mode,location,meetingLink,notes) => {
    return new Promise((resolve, reject) => {
        db.query("insert  into schedules (uid, j_id, date, time, mode, location, meetingLink, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
        [uid, j_id, date, time, mode, location, meetingLink, notes], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.updateInterviewStatus = (id, status) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE schedules SET status = ? WHERE id = ?", 
        [status, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getCompletedInterviews = (uid) => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT 
            s.*, 
            u.name AS candidateName, 
            j.j_name AS jobTitle
            from schedules s
            join user u ON s.uid = u.uid
            join job j ON s.j_id = j.j_id
            where s.status = 'COMPLETED';

        `, [uid], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

