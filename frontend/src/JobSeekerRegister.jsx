
import React, { useState } from 'react';
import {registerJobSeeker} from './services/jobseekerService';

const JobSeekerRegister = () => {

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        contact:"",
        password:""
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        registerJobSeeker(formData)
        .then((data)=>{
            alert("Registration successful!");
            setFormData({ name: '', email: '', contact: '', password: '' });    
        })
        .catch((error)=>{
            alert("Error: " + error.message);
        });

    };
    return (
    <div className="container py-5" style={{marginTop:"80px" , width: "800px"}}>
        <h2 className="mb-4">Job Seeker Register</h2>
        <form className="p-4 rounded shadow bg-white " onSubmit={handleSubmit} style={{width:"800px"}}>
            <div className="mb-3"> 
                <label className="form-label ">Name</label>
                <input type="name" className="form-control"name="name" value={formData.name}style={{width:"500px ",border:"1px solid black"}}  placeholder="Enter your name" onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="Email" className="form-control" name="email" value={formData.email} style={{width:"500px ",border:"1px solid black"}} placeholder="Enter Email"onChange={handleChange} />
            </div>

             <div className="mb-3">
                <label className="form-label">Contact</label>
                <input type="text" className="form-control" name="contact" value={formData.contact} style={{width:"500px ",border:"1px solid black"}} placeholder="Enter Contact"onChange={handleChange} />
            </div>

            <div className="mb-3" >
                <label >Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} style={{width:"500px ",border:"1px solid black"}} placeholder="Enter Password"onChange={handleChange}/>

            </div>
             <div style={{textAlign: "center"}}>
                 <button type="submit" className="btn btn-primary m-3" onClick={handleSubmit}>Register

            </button>


             </div>
           
        </form>

    </div>
    );
  
};

export default JobSeekerRegister;