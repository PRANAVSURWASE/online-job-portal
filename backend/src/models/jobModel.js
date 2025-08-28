let db =require("../../db.js");

exports.viewAllJobs = () => {
    return new Promise((resolve, reject) => {
        db.query("select j.j_id,j.j_name,j.skills,j.location,j.hr_id,h.company_name FROM job j JOIN hr h ON  j.hr_id = h.hr_id; ", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.viewAllCompanies =()=>{
    return new Promise((resolve,reject)=>{
        db.query("select company_name from hr",(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}