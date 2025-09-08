let adminModel=require("../models/adminModel");


exports.getAdmin = async (req, res) => {
  try {
    const admin = await adminModel.getAdmin();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ msg: "Admin Profile Loaded successfully", admin });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};


exports.getAdminStats = async (req, res) => {
  try {
    const [userCount, hrCount, jobCount] = await Promise.all([
      adminModel.getUserCount(),
      adminModel.getHRCount(),
      adminModel.getJobCount(),
    ]);

    res.json({ userCount, hrCount, jobCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin stats", error: err.message });
  }
};
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
    let {hr_id}=req.params;
   
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

exports.viewEnquiry = (req, res) => {
    let promise = adminModel.viewEnquiry(); 
    promise.then((result) => {
        if (result.length > 0) {
            res.json({ msg: "Enquiries fetched successfully", data: result });      
        } else {
            res.json({ msg: "No enquiries found" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server Error", error: err.message || err });
    });
}
exports.deleteEnquiry = (req, res) => {
    let { enquiry_id } = req.params;
    // Validate input
    if (!enquiry_id) {
        return res.status(400).json({ msg: "Enquiry ID is required" });
    }
    let promise = adminModel.deleteEnquiry(enquiry_id);
    promise.then((result) => {

        if (result.affectedRows > 0) {
            res.status(200).json({ msg: "Enquiry deleted successfully" });
        }
        else {
            res.status(404).json({ msg: "No enquiry found with the given ID" });
        }
    }).catch((err) => {
        res.status(500).json({ msg: "Internal server Error", error: err.message || err });
    });
}   
