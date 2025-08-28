import React from 'react';
import {registerEmployer} from './services/employerService';
import { useState } from 'react';

const EmployerRegister = () =>{

  const [formData,setFormData]=useState({
    name:"",
    company_name:"",
    password:"",
    contact:"",
    email:"",
  });

   const [loading, setLoading] = useState(false);

  const handleChange=(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    registerEmployer(formData)
      .then((data) => {
        alert("Registration successful!");
        setFormData({ name: '', company_name: '', password: '', contact: '', email: '' });
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return(
  <div className="container py-5" style={{ marginTop: "80px", width: "800px" }}>
    <h2 className="mb-4">Employer Registration</h2>

    <form className="p-4 rounded shadow bg-white "onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control"name="name"value={formData.name} style={{width:"500px ",border:"1px solid black"}} placeholder="Enter name" onChange={handleChange}/>
      </div>

       <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input type="text" className="form-control" name="company_name"value={formData.company_name}style={{width:"500px ",border:"1px solid black"}} placeholder="Enter company name" onChange={handleChange} />
      </div>

         <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" name="password"value={formData.password} style={{width:"500px ",border:"1px solid black"}} placeholder="Password"onChange={handleChange} />
      </div>

         <div className="mb-3">
        <label className="form-label">contact</label>
        <input type="password" className="form-control"name="contact" value={formData.contact}  style={{width:"500px ",border:"1px solid black"}} placeholder="contact"onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email"value={formData.email}style={{width:"500px ",border:"1px solid black"}} placeholder="Enter email"onChange={handleChange} />
      </div>
   
      <div style={{ textAlign: "center" }}>
         <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>Register
          {loading ? "Registering...":""}
         </button>

      </div>
     
    </form>
  </div>

);
};

export default EmployerRegister;