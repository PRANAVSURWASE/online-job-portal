import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginJobSeeker } from "./services/jobseekerService";

const JobSeekerLogin = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginJobSeeker(formData)
      .then((res) => {
        setAlertType("success");
        setMsg(res.data.msg || "Login successful!");
        sessionStorage.setItem("jobSeekerToken", res.data.token);
        sessionStorage.setItem("jobSeekerData", JSON.stringify(res.data.user));

        // clear form
        setFormData({ email: "", password: "", role: "user" });

        // redirect after 2s
        setTimeout(() => {
          setMsg("");
          navigate("/jobseeker-profile");
        }, 500);
      })
      .catch((error) => {
        setAlertType("danger");
        setMsg(
          error.response?.data?.msg || "Something went wrong. Please try again."
        );

        setTimeout(() => setMsg(""), 2000);
      });
  };

  return (
    <div
      className="container py-5"
      style={{ marginTop: "80px", width: "800px" }}
    >
      <h2 className="mb-4">Job Seeker Login</h2>
      {msg && (
        <div className={`alert alert-${alertType} text-center`} role="alert">
          {msg}
        </div>
      )}

      <form className="p-4 rounded shadow bg-white" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            style={{ width: "500px", border: "1px solid black" }}
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            style={{ width: "500px", border: "1px solid black" }}
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary m-3">
          Login
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/jobseeker-register")}
        >
          Register as Job Seeker
        </button>
      </form>
    </div>
  );
};

export default JobSeekerLogin;
