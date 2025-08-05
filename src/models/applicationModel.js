let db = require("../../db.js");

exports.checkAlreadyApplied = (u_id, j_id) => {
    return new Promise((resolve, reject) => {   
        db.query("select * from apply_jobs where u_id = ? AND j_id = ?", [u_id, j_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.applyForJob = (u_id, j_id) => {
    return new Promise((resolve, reject) => {
        db.query("insert into apply_jobs (u_id, j_id) VALUES (?, ?)", [u_id,j_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.viewApplicationsHistory= (u_id) => {
    return new Promise((resolve, reject) => {
        db.query( `
            SELECT 
                j.j_id AS jobId,
                j.j_name AS title,
                j.location as location,

                aj.apply_date AS applied_at
            FROM apply_jobs aj
            JOIN job j ON aj.j_id = j.j_id
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