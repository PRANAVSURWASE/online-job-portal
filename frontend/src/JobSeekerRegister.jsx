import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerJobSeeker } from "./services/jobseekerService";

const JobSeekerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
   const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerJobSeeker(formData)
      .then((res) => {
        alert(res.data.msg||"Registration successful!");
        setFormData({ name: "", email: "", contact: "", password: "" });
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen hero-gradient p-5 font-[Inter]">
      <div className="container py-3 " style={{ marginTop: "120px", width: "580px" }}>
        <h2 className="text-2xl font-bold mb-3 text-center text-white">Job Seeker Register</h2>
          <form
        className="p-4 rounded shadow bg-white "
        onSubmit={handleSubmit}
        style={{ width: "580px" }}
      >
        <div className="mb-3">
          <label className="form-label ">Name</label>
          <input
            type="name"
            className="form-control"
            name="name"
            value={formData.name}
            style={{ width: "500px ", border: "1px solid black" }}
            placeholder="Enter your name"
            autoComplete="name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="Email"
            className="form-control"
            name="email"
            value={formData.email}
            style={{ width: "500px ", border: "1px solid black" }}
            placeholder="Enter Email"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={formData.contact}
            style={{ width: "500px ", border: "1px solid black" }}
            placeholder="Enter Contact"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            style={{ width: "500px ", border: "1px solid black" }}
            placeholder="Enter Password"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-primary m-3"
            onClick={handleSubmit}
          >
            Register
          </button>
          <button
              type="button"
              className="btn btn-secondary m-3"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default JobSeekerRegister;
