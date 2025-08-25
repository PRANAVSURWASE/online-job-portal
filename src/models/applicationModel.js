let db = require("../../db.js");

exports.checkAlreadyApplied = (u_id, j_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM apply_jobs WHERE u_id = ? AND j_id = ?";
        db.query(query, [u_id, j_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

exports.applyForJob = (u_id, hr_id, j_id) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO apply_jobs (u_id, hr_id, j_id, apply_date) VALUES (?, ?, ?, NOW())";
        db.query(query, [u_id, hr_id, j_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

exports.viewApplicationsHistory= (u_id) => {
    return new Promise((resolve, reject) => {
        db.query( `
             SELECT aj.*, j.j_name, j.skills, j.location, h.name AS hr_name, h.company_name
            FROM apply_jobs aj
            JOIN job j ON aj.j_id = j.j_id
            JOIN hr h ON aj.hr_id = h.hr_id
            WHERE aj.u_id = ?
        `, [u_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}