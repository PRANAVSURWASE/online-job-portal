import React, { useState, useEffect } from "react";
import { Alert, Container, Row, Col, Card, Button, Table, Modal, Form } from "react-bootstrap";
import { Users, Briefcase, UserCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAdminProfile, getAdminStats, getHRs, addHR, deleteHR, updateHR } from "./services/adminService";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({ userCount: 0, hrCount: 0, jobCount: 0 });
  const [formData, setformData] = useState({
    name: "",
    company_name: "",
    password: "",
    contact: "",
    email: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [hrs, setHrs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  // clear messages after 3 sec
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addHR(formData)
      .then((res) => {
        setSuccess(res.data.msg);
        setError("");
        setformData({ name: "", company_name: "", password: "", contact: "", email: "" });
        setShowForm(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || "Failed to add HR");
        setSuccess("");
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    getAdminProfile(token)
      .then((res) => setAdmin(res.data.admin))
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch admin profile. Please log in again.");
        sessionStorage.clear();
        navigate("/admin-login");
      });

    getAdminStats(token)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!admin) return <p>Loading...</p>;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleViewHR = () => {
    const token = sessionStorage.getItem("adminToken");
    getHRs(token)
      .then((res) => {
        console.log("HR API response:", res.data);
        setHrs(res.data.data);
        setShowModal(true);
      })
      .catch(() => setError("Failed to fetch HRs"));
  };

  const handleDelete = (hr_id) => {
    deleteHR(hr_id)
      .then((res) => {
        setSuccess(res.data.msg);
        setError("");
        setHrs((prevHrs) => prevHrs.filter((hr) => hr.hr_id !== hr_id));
      })
      .catch((err) => {
        console.error(err);
        setError("Error deleting HR");
        setSuccess("");
      });
  };

  const handleUpdate = () => {
    updateHR(editData)
      .then((res) => {
        setSuccess(res.data.msg);
        setError("");
        setHrs((prev) => prev.map((hr) => (hr.hr_id === editData.hr_id ? editData : hr)));
        setEditData(null); // close edit form
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.msg || "Error updating HR");
      });
  };

  const statCards = [
    { icon: Briefcase, title: "Total Jobs", count: stats.jobCount, description: "Jobs posted on the platform" },
    { icon: UserCheck, title: "Total HRs", count: stats.hrCount, description: "HR accounts managing job postings" },
    { icon: Users, title: "Total Users", count: stats.userCount, description: "Registered job seekers on the platform" }
  ];

  return (
    <Container style={{ marginTop: "65px" }}>
      <div className="card shadow-lg p-4 mb-5 text-center">
        <h2 className="mb-3">Admin Profile</h2>
        <p className="p-2 rounded bg-light">
          <strong>Email:</strong> {admin.email}
        </p>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" className="d-inline-flex align-items-center gap-2" onClick={handleLogout}>
            <LogOut size={23} /> Logout
          </Button>

          <Button
            variant="primary"
            className="d-inline-flex align-items-center gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            Add HR
          </Button>

          <Button variant="primary" className="d-inline-flex align-items-center gap-2" onClick={handleViewHR}>
            View HR
          </Button>
        </div>

        <div className="shifted-div">
          <Row>
            {statCards.map((stat, index) => (
              <Col key={index} lg={4} md={6} className="mb-4">
                <Card className="h-100 border-0 shadow-sm text-center p-4 card-hover">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <stat.icon size={30} className="text-primary" />
                  </div>
                  <Card.Title className="h5 mb-2">{stat.title}</Card.Title>
                  <p className="text-primary fw-bold mb-2">{stat.count.toLocaleString()}</p>
                  <Card.Text className="text-muted small">{stat.description}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Add HR Form */}
      {showForm && (
        <Card className="shadow-lg border-0 mt-4">
          <Card.Header className="bg-primary text-white text-center fw-bold">Add New HR</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>HR Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter HR name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Add HR
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      
      {editData && (
        <Card className="shadow-lg border-0 mt-4">
          <Card.Header className="bg-primary text-white text-center fw-bold">Edit HR</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>HR Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={editData.company_name}
                  onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={editData.contact}
                  onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setEditData(null)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                  Update HR
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* HR List Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>HR List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hrs.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hrs.map((hr) => (
                  <tr key={hr.hr_id}>
                    <td>{hr.hr_id}</td>
                    <td>{hr.name}</td>
                    <td>{hr.company_name}</td>
                    <td>{hr.email}</td>
                    <td>{hr.contact}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setEditData(hr)} // open edit form
                        className="me-2"
                      >
                        Update
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(hr.hr_id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted">No HRs found</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminProfile;
