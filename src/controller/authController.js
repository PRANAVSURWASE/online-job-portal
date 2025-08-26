const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const hrModel = require("../models/hrModel.js");
const adminModel = require("../models/adminModel.js");



exports.loginUser = (req, res) => {
  console.log("User Body",req);
  
  const { email, password } = req.body; 

  if (!email || !password) 
  {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  userModel.findUserByEmail(email)
    .then((results) => {
      if (results.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      const user = results[0];
      // plain text password check
      if (user.password !== password) {
        return res.status(401).json({ msg: "Invalid password" });
      }
     
      const token = jwt.sign(
        { uid:user.uid,name:user.name, email: user.email,contact:user.contact,skills:user.skills,education:user.education,role: "user"},
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ msg:"Login Successfully",token,user }); // only return token now
    })
    .catch((err) => {
      res.status(500).json({ msg: "DB error", error: err.message || err });
    });
};


exports.loginHr = (req, res) => {
  const { email, password } = req.body; 
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }
  hrModel.findHrByEmail(email)
    .then((results) => {
      if (results.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      const hr = results[0];
      // plain text password check
      if (hr.password !== password) {
        return res.status(401).json({ msg: "Invalid password" });
      }
     
      const token = jwt.sign(
        { id: hr.hr_id,name:hr.name,company_name:hr.company_name,contact:hr.contact,email: hr.email,role:"hr"},
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ token }); // only return token now
    })
    .catch((err) => {
      res.status(500).json({ msg: "DB error", error: err.message || err });
    });
}

exports.loginAdmin = (req,res)=>{
  const {email,password} = req.body;
  
  adminModel.findAdminByName(email)
    .then((results) => {
      if (results.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      const admin = results[0];
      // plain text password check
      if (admin.password !== password) {
        return res.status(401).json({ msg: "Invalid password" });
      }
     
      const token = jwt.sign(
        { email: admin.email, password: admin.password ,role:"admin"},
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ token }); // only return token now
    })
    .catch((err) => {
      res.status(500).json({ msg: "DB error", error: err.message || err });
    });
}
