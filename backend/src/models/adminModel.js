let db=require("../../db.js");


exports.getAdmin = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT email FROM admin LIMIT 1"; 
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};
/**
 * Admin Login
 * Authenticates admin using username and password.
 * Returns a promise that resolves with the admin records if found.
 */

exports.adminLogin=(email,password)=>{
        return new Promise((resolve,reject)=>{
        
        db.query("select * from admin where email=? and password=?",[email,password],(err,result)=>{
            console.log(err,result);
            if(err){
                reject(err); 
            }else{
                resolve(result);
            }
        });
    });
}

/**
 * View all HRs
 * Fetches all HR records from the database.
 * Returns a promise that resolves with the list of HRs.
 */
exports.viewHR=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from hr",(err,result)=>{
            console.log(err,result);
            if(err){
                reject(err); 
            }else{
                resolve(result);
            }
        });
    });
}
/**
 * Delete HR
 * Deletes an HR by hr_id.
 * Returns a promise that resolves with the result of the delete operation.
 */
exports.deleteHR=(hr_id)=>{
    return new Promise((resolve,reject)=>{
        db.query("DELETE FROM hr WHERE hr_id = ?", [hr_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
/**
 * Update HR
 * Updates HR details by hr_id.
 * Returns a promise that resolves with the result of the update operation.
 */
exports.updateHR=(hr_id, name, company_name, password, contact, email)=>{
    return new Promise((resolve, reject) => {
        db.query("UPDATE hr SET name = ?, company_name = ?, password = ?, contact = ?, email = ? WHERE hr_id = ?", 
        [name, company_name, password, contact, email,hr_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
/**
 * Add HR
 * Adds a new HR to the database.
 * Returns a promise that resolves with the result of the insert operation.
 */
exports.addHR=(name, company_name, password, contact, email)=>{
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO hr (name, company_name, password, contact, email) VALUES (?, ?, ?, ?, ?)", 
        [name, company_name, password, contact, email], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.findAdminByName = (email) => {
    return new Promise((resolve, reject) => {
    db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

exports.getUserCount = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS count FROM user", (err, result) => {
      if (err) reject(err);
      else resolve(result[0].count);
    });
  });
};

// Count total HRs
exports.getHRCount = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS count FROM hr", (err, result) => {
      if (err) reject(err);
      else resolve(result[0].count);
    });
  });
};

// Count total jobs
exports.getJobCount = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) AS count FROM job", (err, result) => {
      if (err) reject(err);
      else resolve(result[0].count);
    });
  });
};

exports.viewEnquiry = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM contact_message", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }); 
};

exports.deleteEnquiry = (enquiry_id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM contact_message WHERE id = ?", [enquiry_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }); 
};              