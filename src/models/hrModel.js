let db=require("../../db.js");

/**
 * HR Registration
 * Inserts a new HR record into the HR table.
 * Returns a promise that resolves with the result of the insert operation.
 */
exports.hrRegister=(name,company_name,password,contact,email)=>{
        return new Promise((resolve,reject)=>{
        
        db.query("INSERT INTO HR (name, company_name, password, contact, email) VALUES (?, ?, ?, ?, ?)",[name,company_name,password,contact,email],(err,result)=>{
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
 * HR Login
 * Authenticates HR using email and password.
 * Returns a promise that resolves with the HR record(s) if found.
 */
exports.hrLogin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        db.query("select * from hr where email=? and password=?",[email,password],(err,result)=>{
            console.log(err,result);
            if(err){
                reject(err); 
            }else{
                resolve(result);
            }
        });
    });
}
exports.createJob=(hr_id, j_name,skills)=>{
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO job (hr_id, j_name, skills ) VALUES (?, ?, ?)", 
        [hr_id, j_name,skills], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
exports.listjobs=()=>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM job", (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}