let db =require("../../db.js");

exports.viewAllJobs = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM job", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}