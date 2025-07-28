let adminModel=require("../models/adminModel");

exports.adminLogin=(req,res)=>{
    
        let {u_name,password}=req.body;
        console.log("Admin login request received",u_name,password);
       
     let promise=adminModel.validateAdmin(u_name,password);
    promise.then((result)=>{
        if(result.length>0){
            
            res.json({ msg: "Login successful" });
        }else{
            res.json({msg:"User or password is incorrect"});
        }
    }).catch((err)=>{
        res.json({msg:"Internal server Error",error:err.message||err});
    })
}