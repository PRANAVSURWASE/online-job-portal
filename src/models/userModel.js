let db = require('../../db.js');

exports.loginUser = (email, password) => {
     
    return new Promise((resolve, reject) =>{   
        db.query( "select * from user where email = ? and password = ?", [email, password], (err, result) => {
            console.log(err, result );
            
            if (err) {  
                reject(err);
            } else  {  
                resolve(result);
            }                
        }
        );
    });
}

exports.registerUser = (name, email, password, contact) => {
    return new Promise((resolve,reject)=>{
         db.query("INSERT INTO user (name, email, password, contact) VALUES (?, ?, ?, ?)", [name, email, contact, password], (err, result) => {
            console.log(err, result);
            if (err) {
                reject(err);
            } else {
                console.log(result);

                resolve(result);
            }
    })
})
}
       
    
    
