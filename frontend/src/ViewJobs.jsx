import { useEffect, useState } from "react";
import { getAllJobs } from "./services/jobService";
import { Card, Row, Col, Alert, Badge, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllJobs()
      .then((allJobs) => {
        if (allJobs.length > 0) {
          setJobs(allJobs);
          setFilteredJobs(allJobs);
        } else {
          setError("No jobs found");
        }
      })
      .catch(() => {
        setError("Failed to fetch jobs");
      });
  }, []);

  // 🔎 filter jobs as user types
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredJobs(
        jobs.filter(
          (job) =>
            job.j_name.toLowerCase().includes(lowerSearch) ||
            job.company_name.toLowerCase().includes(lowerSearch) ||
            job.location.toLowerCase().includes(lowerSearch) ||
            job.skills.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, jobs]);

  return (
  <section className="hero-gradient text-white py-5" style={{ marginTop: '58px', minHeight: '90vh' }}>
    <div className="container">
      <h2 className="text-center mb-4">💼 Available Jobs</h2>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search jobs by title, company, location, or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 form-control-lg"
      />

      {error && <Alert variant="danger">{error}</Alert>}

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, index) => (
          <div
            key={index}
            className="job-block shadow-sm p-4 mb-4 rounded border bg-white text-dark"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-primary">{job.company_name}</h5>
                <h4 className="fw-bold mb-2">{job.j_name}</h4>
                <p className="mb-2">
                  📍 <strong>Location:</strong> {job.location}
                </p>
                <div className="mb-2">
                  <strong>Skills:    </strong>
                  {/* <br /> */}
                  {job.skills.split(",").map((skills, i) => (
                    <Badge bg="secondary" className="me-2 mt-2" key={i}>
                      {skills.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary px-4 py-2"
                  onClick={() => navigate("/jobseeker-login")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No matching jobs found.</p>
      )}
    </div>
  </section>
);

};

export default ViewJobs;
