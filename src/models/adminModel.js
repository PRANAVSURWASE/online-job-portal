let db=require("../../db.js");

/**
 * Admin Login
 * Authenticates admin using username and password.
 * Returns a promise that resolves with the admin records if found.
 */
exports.adminLogin=(u_name,password)=>{
        return new Promise((resolve,reject)=>{
        
        db.query("select * from admin where u_name=? and password=?",[u_name,password],(err,result)=>{
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