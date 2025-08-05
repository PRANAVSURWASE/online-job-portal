let adminModel=require("../models/adminModel");

/**
 * Admin Login
 * Authenticates admin using username and password.
 */

exports.adminLogin=(req,res)=>{
    
        let {u_name,password}=req.body;
       
     let promise=adminModel.adminLogin(u_name,password);
    promise.then((result)=>{
        if(result.length>0){
            res.json({ msg: "Login successful" });
        }else{
            res.json({msg:"User or password is incorrect"});
        }
    }).catch((err)=>{
        res.json({msg:"Internal server Error ",error:err.message||err});
    })
}

/**
 * View all HRs
 * Fetches all HR records from the database.
 */

exports.viewHR=(req,res)=>{
    let promise=adminModel.viewHR();
    promise.then((result)=>{
        if(result.length>0){
            res.json({msg:"HRs fetched successfully",data:result});
        }else{
            res.json({msg:"No HRs found"});
        }
    }).catch((err)=>{
        res.json({msg:"Internal server Error ",error:err.message||err});
    })
}  
/**
 * Delete HR
 * Deletes an HR by hr_id.
 */
exports.deleteHR=(req,res)=>{
    let {hr_id}=req.body;
   
    // Validate input
    if(!hr_id){
        return res.status(400).json({msg:"HR ID is required"});
    }
    
    let promise=adminModel.deleteHR(hr_id);
    promise.then((result)=>{
        if(result.affectedRows>0){
            res.status(200).json({msg:"HR deleted successfully"});
        }else{
            res.status(404).json({msg:"No HR found with the given ID"});
        }
    }).catch((err)=>{
        res.status(500).json({msg:"Internal server Error ",error:err.message||err});
    })
}

/**
 * Update HR
 * Updates HR details by hr_id.
 */

exports.updateHR=(req,res)=>{   
    let {hr_id, name, company_name, password, contact, email} = req.body;

    console.log(name, company_name, password, contact, email)
    
    // Validate input
   if(!hr_id || !name || !company_name || !password || !contact || !email){
       return res.json({msg:"All fields are required"});
    }
    
    let promise = adminModel.updateHR(hr_id, name, company_name, password, contact, email);
    promise.then((result) => {

        if (result.affectedRows > 0) {
            res.status(200).json({ msg: "HR updated successfully" });
        } else {
            res.status(401).json({ msg: "No HR found with the given ID" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server Error", error: err.message || err });
    });
}
/**
 * Update HR
 * Updates HR details by hr_id.
 */
exports.addHR = (req, res) => {
    let{name,company_name,password,contact,email}=req.body;

    // Validate input
    if (!name || !company_name || !password || !contact || !email) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    let promise = adminModel.addHR(name, company_name, password, contact, email);
    promise.then((result) => {
        if (result.affectedRows > 0) {
            res.status(201).json({ msg: "HR added successfully" });
        } else {
            res.status(500).json({ msg: "HR addition failed" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server Error", error: err.message || err });
    });
}