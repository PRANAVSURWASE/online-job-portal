let db = require("../../db.js");

exports.checkAlreadyApplied = (uid, j_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM apply_jobs WHERE uid = ? AND j_id = ?";
        db.query(query, [uid, j_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

exports.applyForJob = (uid, hr_id, j_id) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO apply_jobs (uid, hr_id, j_id, apply_date) VALUES (?, ?, ?, NOW())";
        db.query(query, [uid, hr_id, j_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

exports.viewApplicationsHistory= (uid) => {
    return new Promise((resolve, reject) => {
        db.query( `
             SELECT aj.apply_date,aj.j_id, j.j_name, j.skills, j.location, h.name AS hr_name, h.company_name
            FROM apply_jobs aj
            JOIN job j ON aj.j_id = j.j_id
            JOIN hr h ON aj.hr_id = h.hr_id
            WHERE aj.uid = ?
            ORDER BY aj.apply_date DESC
        `, [uid], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
exports.getJobsAppliedByUser = (hr_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT u.uid, u.name, u.email, u.contact,u.education,u.skills, j.j_name, j.j_id,aj.apply_date
      FROM apply_jobs aj
      JOIN user u ON aj.uid = u.uid
      JOIN job j ON aj.j_id = j.j_id
      WHERE aj.hr_id = ?;
    `;

    db.query(query, [hr_id], (err, result) => {
      console.log(err, result);
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteApplication=(uid, j_id)=>{
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM apply_jobs WHERE uid = ? AND j_id = ?";
        db.query(query, [uid, j_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}