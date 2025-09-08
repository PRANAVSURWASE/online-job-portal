import { useState, useEffect } from "react";
import {  useLocation,useNavigate } from "react-router-dom";
import { getJobSeekerProfile,getUpdatedJobSeekerProfile } from "./services/jobseekerService";

const JobSeekerEditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    skills: "",
    education: "",
    resume: null,
  });
  const location = useLocation();
  const [msg, setMsg] = useState(location.state?.msg || "");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("jobSeekerData"));
    console.log("Loaded userData:", userData);
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        contact: userData.contact || "",
        password: userData.password || "",
        skills: userData.skills || "",
        education: userData.education || "",
        resume: userData.resume || null,
      });
    }else {
      let token = sessionStorage.getItem("jobSeekerToken");
    // Fetch from backend
    getJobSeekerProfile(token)
        .then((res) => {
          const user = res.data.user;
          setFormData({
            name: user.name || "",
            email: user.email || "",
            contact: user.contact || "",
            password: user.password || "",
            skills: user.skills || "",
            education: user.education || "",
            resume: user.resume || null,
          });
          sessionStorage.setItem("jobSeekerData", JSON.stringify(user));
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setMsg("Failed to load profile data.");
          setAlertType("danger");
        });
    }
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("password", formData.password);
    data.append("skills", formData.skills);
    data.append("education", formData.education);

    if (formData.resume && typeof formData.resume !== "string") {
      data.append("resume", formData.resume);
    }

    getUpdatedJobSeekerProfile(data) // pass FormData instead of JSON
      .then((res) => {
        setMsg("Profile updated successfully!");
        setAlertType("success");
        sessionStorage.setItem("jobSeekerData", JSON.stringify(res.data.user));
          setTimeout(() => {
          setMsg("");
          navigate("/jobseeker-profile", {
            state: { user: res.data.user, msg: res.data.msg },
          });
        }, 2000);
      })
      .catch((err) => {
        setMsg(err.response?.data?.msg || "Something went wrong!");
        setAlertType("danger");
        setTimeout(() => setMsg(""), 3000);
      });
  };

  return (
    <div className="container-fluid hero-gradient " style={{ marginTop: "58px" }}>
      <div className="card shadow p-4 col-md-6 offset-md-3">
        <h2 className="text-center mb-2">Edit Profile</h2>
        {msg && (
          <div className={`alert alert-${alertType} text-center`} role="alert">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
          </div>

          {/* Skills */}
          <div className="mb-3">
            <label className="form-label">Skills</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Java, React, Node.js"
            />
          </div>

          {/* Education */}
          <div className="mb-3">
            <label className="form-label">Education</label>
            <input
              type="text"
              name="education"
              className="form-control"
              value={formData.education}
              onChange={handleChange}
              placeholder="e.g. B.Tech in Computer Science"
            />
          </div>
          {/* Resume Upload */}
          <div className="mb-3">
            <label className="form-label">Upload Resume (PDF)</label>
            <input
              type="file"
              name="resume"
              className="form-control"
              accept="application/pdf"
              onChange={(e) =>{
                if (e.target.files.length > 0) {
                  setFormData({ ...formData, resume: e.target.files[0] });
                }
              }}
            />
          </div>
          {formData.resume && typeof formData.resume === "string" && (
            <div className="mb-3">
              <a
                href={`http://localhost:4000/${formData.resume}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Current Resume
              </a>
            </div>
          )}
          {/* Submit Button */}
          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-primary w-100">
                Save Changes
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerEditProfile;
