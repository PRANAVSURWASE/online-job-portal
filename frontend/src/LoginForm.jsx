import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: call backend login API here
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = () => {
    navigate("/jobseeker-register"); // Redirect to registration page
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-4">Login</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Sign In</button>

          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
