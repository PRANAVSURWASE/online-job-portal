let db=require("../../db.js");


exports.validateAdmin=(u_name,password)=>{
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