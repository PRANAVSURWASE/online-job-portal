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

