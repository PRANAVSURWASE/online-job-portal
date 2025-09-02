let db=require("../../db.js");

/**
 * HR Registration
 * Inserts a new HR record into the HR table.
 * Returns a promise that resolves with the result of the insert operation.
 */
exports.hrRegister=(name,company_name,password,contact,email,role)=>{
        return new Promise((resolve,reject)=>{
        
        db.query("insert into hr (name, company_name, password, contact, email) VALUES (?, ?, ?, ?, ?)",[name,company_name,password,contact,email],(err,result)=>{
            console.log(err,result);
            if(err){
                reject(err); 
            }else{
                resolve(result);
            }
        });
    });
}

exports.createJob = (hr_id, j_name, skills, location) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO job (hr_id, j_name, skills, location, posted_date) VALUES (?, ?, ?, ?, NOW())",
      [hr_id, j_name, skills, location],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.listjobs=()=>{
    return new Promise((resolve, reject) => {
        db.query("select * from job", (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
exports.getJobById=(hr_id)=>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM job WHERE hr_id = ? order by posted_date DESC", [hr_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.deleteJobById=(j_id)=>{
    return new Promise((resolve, reject) => {
        console.log("Deleting job with ID:", j_id);
        db.query("DELETE FROM job WHERE j_id = ?", [j_id], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.updateJobById = (j_id, jobData) => {
  return new Promise((resolve, reject) => {
    const { j_name, skills, location } = jobData;
    const query = "UPDATE job SET j_name = ?, skills = ?, location = ? WHERE j_id = ?";
     db.query(query, [j_name, skills, location, j_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.searchJobsByName=(j_name)=>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM job WHERE j_name LIKE ?", [`%${j_name}%`], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.findHrByEmail = (email) => {
  console.log("Finding HR by email:", email);
  
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM hr WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}