let db = require("../../db.js");

exports.hasAppliedForJob = (uid, j_id) => {
    return new Promise((resolve, reject) => {
        db.query("select * from apply_jobs where uid = ? AND j_id = ?", 
        [uid, j_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

exports.scheduleInterview = (uid, j_id, date, time, mode, location, meetingLink, notes, hr_id) => {
    console.log(hr_id);
    
    return new Promise((resolve, reject) => {
        const status = "SCHEDULED";
        db.query(
            `INSERT INTO schedules 
             (uid, hr_id, j_id, date, time, mode, location, meetingLink, notes, status, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [uid, hr_id, j_id, date, time, mode, location, meetingLink, notes, status],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

exports.getScheduledInterviewsByHr = (hr_id) => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT 
                s.*, 
                u.name AS candidateName, 
                j.j_name AS jobTitle,
                hr.name AS hrName
            FROM schedules s
            JOIN user u ON s.uid = u.uid
            JOIN job j ON s.j_id = j.j_id
            JOIN hr hr ON s.hr_id = hr.hr_id
            WHERE s.hr_id = ? AND s.status = 'SCHEDULED';
        `, [hr_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


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

