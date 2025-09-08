let db = require('../../db.js');



exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.registerUser = (name, email, contact, password ) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO user (name, email, contact,password) VALUES (?, ?, ?, ?)", [name, email, contact,password], (err, result) => {
        if (err) return reject(err);
        resolve(result);
        });
    });
    }
exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, name, email, contact FROM user WHERE id = ?",
      [id],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

exports.updateUser = (uid, name, email, contact, skills, education, resume) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE user SET name = ?, email = ?, contact = ?, skills = ?, education = ?, resume = ? WHERE uid = ?`;
    const values = [name, email, contact, skills, education, resume, uid];
    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

exports.searchJobsByName=(j_name)=>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM job WHERE j_name LIKE ? ", [`%${j_name}%`], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}