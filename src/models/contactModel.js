let db = require("../../db.js");

exports.submitContact=(name,email,subject,message)=>{
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO contact_message (name, email, subject, message) VALUES (?, ?, ?, ?)", 
        [name, email, subject, message], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
};