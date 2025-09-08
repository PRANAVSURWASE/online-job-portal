import React from "react";
import { useNavigate } from "react-router-dom"; 
import { registerEmployer } from "./services/employerService";
import { useState } from "react";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    password: "",
    contact: "",
    email: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerEmployer(formData)
      .then((data) => {
        alert("Registration successful!");
        setFormData({
          name: "",
          company_name: "",
          password: "",
          contact: "",
          email: "",
        });
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen hero-gradient p-5 font-[Inter] pt-10">
      <div className="container py-3 " style={{ marginTop: "40px", width: "580px" }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white"> Employer Registration</h2>
          <form className="p-4 rounded shadow bg-white flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="mb-3 w-full flex flex-col items-center">
              <label className="form-label">Name</label>
                <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              style={{ width: "500px ", border: "1px solid black" }}
              placeholder="Enter name"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 w-full flex flex-col items-center">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              name="company_name"
              value={formData.company_name}
              style={{ width: "500px ", border: "1px solid black" }}
              placeholder="Enter company name"
              autoComplete="organization"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 w-full flex flex-col items-center">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              style={{ width: "500px ", border: "1px solid black" }}
              placeholder="Password"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 w-full flex flex-col items-center">
            <label className="form-label">contact</label>
            <input
              type="password"
              className="form-control"
              name="contact"
              value={formData.contact}
              style={{ width: "500px ", border: "1px solid black" }}
              placeholder="contact"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 w-full flex flex-col items-center">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              style={{ width: "500px ", border: "1px solid black" }}
              placeholder="Enter email"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              onClick={handleSubmit}
            >
              Register
              {loading ? "Registering..." : ""}
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

export default EmployerRegister;
