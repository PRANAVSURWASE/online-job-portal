import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [role, setRole] = useState("user"); // default role
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let loginUrl = "";
      if (role === "admin") {
        loginUrl = "http://localhost:4000/auth/adminLogin";
      } else if (role === "hr") {
        loginUrl = "http://localhost:4000/auth/hrLogin";
      } else if (role === "user") {
        loginUrl = "http://localhost:4000/auth/login";
      }
      const response = await axios.post(loginUrl, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      if (role === "user") {
        sessionStorage.setItem("jobSeekerToken", token);
      } else if (role === "hr") {
        sessionStorage.setItem("employerToken", token);
      } else if (role === "admin") {
        sessionStorage.setItem("adminToken", token);
      }

      sessionStorage.setItem("user", JSON.stringify(user)); // store user info for all roles
      sessionStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-profile");
      } else if (role === "hr") {
        navigate("/employer-profile");
      } else if (role === "user") {
        navigate("/jobseeker-profile");
      }
    } catch (err) {
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="hero-gradient d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <Container className="d-flex justify-content-center align-items-center">
    <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Sign In</h3>
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Role selector */}
        <Form.Group className="mb-3">
          <Form.Label>Login as</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="user">User</option>
          </Form.Select>
        </Form.Group>

        {/* Login form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              autoComplete="off"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </div>
        </Form>
       </Card>
  </Container>
</section>
  );
};

export default AuthPage;
