let jobModel = require('../models/jobModel.js');

exports.viewAllJobs = (req, res) => {
    
    
    let promise = jobModel.viewAllJobs();
    promise.then((result) => {
        if(result.length > 0) {   
            res.status(200).json({ msg: "Jobs fetched successfully", data: result });
        } else {    
            res.status(404).json({ msg: "No jobs found" });
        }    
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
}

exports.viewAllCompanies = (req,res)=>{

    let promise = jobModel.viewAllCompanies();
    promise.then((result)=>{
        if(result.length>0){
            res.status(200).json({ msg:"Companies Fetched Sucessfully",data:result});
        }
        else{
            res.status(404).json({ msg:"No Companies found"});
        }

    }).catch((err)=>{
        res.status(500).json({ err:err.message});
    })
}