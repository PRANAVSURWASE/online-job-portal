let db = require('../../db.js');



exports.findUserByEmail = (email) => {
  console.log("Finding user by email:", email);
  
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
const getUserById = (id, callback) => {
  const sql = "SELECT id, name, email, contact FROM user WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]); // return single user
  });
};

exports.updateUser =(uid,name,email,contact,password,skills,education)=>{
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE user
      SET name = ?, email = ?, contact = ?, password = ?, skills = ?, education = ?
      WHERE uid = ?
    `;
    const values = [name, email, contact, password, skills, education, uid];

    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result); // You can resolve with result or updated user info
    });
  });

}
    
