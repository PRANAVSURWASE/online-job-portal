let contactModel = require('../models/contactModel');


exports.submitContact=(req,res)=>{
    let {name,email,subject,message} = req.body;
    console.log("Contact request received", name, email, subject, message);
    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    // Call the model to submit the contact request
    console.log("Submitting contact request to model");
    console.log("Contact details:", { name, email, subject, message });

    let promise = contactModel.submitContact(name,email,subject,message);
    promise.then((result) => {
        res.status(201).json({ msg: "Contact request submitted successfully", data: result });
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
};

