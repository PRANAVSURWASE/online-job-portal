import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "./services/employerService";

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "hr",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    loginEmployee(formData)
      .then((res) => {
        setMsg(res.data.message || "Login successful!");
        setAlertType("success"); // green alert

        sessionStorage.setItem("employerToken", res.data.token);
        sessionStorage.setItem("employerData", JSON.stringify(res.data.hr));

        // clear form fields
        setFormData({ email: "", password: "", role: "hr" });

        // wait 2s to show message, then redirect
        setTimeout(() => {
          setMsg("");
          navigate("/employer-profile");
        }, 1000);
      })
      .catch((error) => {
        setMsg(error.response?.data?.message || "Login failed!");
        setAlertType("danger");
        setTimeout(() => setMsg(""), 2000);
      });
  };

  return (
    <div
      className="container py-5"
      style={{ marginTop: "80px", width: "800px" }}
    >
      <h2 className="mb-4">Employer Login</h2>
      {msg && (
        <div
          className={`alert alert-${alertType} text-center py-2`}
          role="alert"
          style={{ fontSize: "14px", padding: "6px 10px" }}
        >
          {msg}
        </div>
      )}

      <form className="p-4 rounded shadow bg-white" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
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
            name="password"
            className="form-control"
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
          className="btn btn-primary ms-3"
          onClick={() => navigate("/employer-register")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EmployerLogin;
