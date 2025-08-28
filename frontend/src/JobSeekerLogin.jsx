
import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginJobSeeker } from "./services/jobseekerService";

const JobSeekerLogin = () => {
  const navigate = useNavigate();
  const[error,setError]=useState("");
  const [success,setSucces]=useState("");

  const[formData,setFormData]=useState({
    email: "",
    password: "",
    role:"user"
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();

      loginJobSeeker(formData)
        .then((res) => {

          console.log("Backend Response:", res.data);
          setError("");
         setSucces(res.data.msg || "Login successful!");
          

          sessionStorage.setItem("jobSeekerToken", res.data.token);
          
          sessionStorage.setItem("jobSeekerData",JSON.stringify(res.data.user));
          console.log(res.data);
          navigate("/jobseeker-profile");

          setFormData({ email: '', password: '', role: 'user' }); // Reset form data
        })
        .catch((error) => {
        console.error("Login error:", error);

        if (error.response && error.response.data && error.response.data.msg) {
          setError(error.response.data.msg); // set backend error message
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
    };
    
      



  return (
    <div className="container py-5" style={{ marginTop: "80px" , width: "800px" }}>
        <h2 className="mb-4"> Job Seeker Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form className="p-4 rounded shadow bg-white" onSubmit={handleSubmit} >
            <div className="mb-3">
                <label className="form">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} style={{width:"500px ",border:"1px solid black"}} placeholder="Enter Email" onChange={handleChange} /> 
            </div>

            <div className="mb-3">
                <label className="form" >Password</label>
                <input type="password" className='form-control' name="password" value={formData.password} style={{width:"500px ",border:"1px solid black"}} placeholder="Enter Password" onChange={handleChange} />
            </div>
            
            <button  type="button" className="btn btn-primary m-3" onClick={handleSubmit} >Login</button>
            <button  type="button" className="btn btn-primary" onClick={()=>navigate('/jobseeker-register')}>Register as Job Seeker</button>

        </form>
     
    </div>
  );
};

export default JobSeekerLogin;