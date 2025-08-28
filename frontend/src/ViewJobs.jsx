import { useEffect, useState } from "react";
import { getAllJobs } from "./services/jobService";
import { Card, Row, Col, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllJobs()
      .then((allJobs) => {
        if (allJobs.length > 0) {
          setJobs(allJobs);
        } else {
          setError("No jobs found");
        }
      })
      .catch(() => {
        setError("Failed to fetch jobs");
      });
  }, []);



  return (
    <div className="container" style={{ marginTop: "70px" }}>
  <h2 className="text-center mb-4">💼 Available Jobs</h2>

  {error && <Alert variant="danger">{error}</Alert>}

  {jobs.map((job, index) => (
    <div
      key={index}
      className="job-block shadow-sm p-4 mb-4 rounded border"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        
        <div>
         
          <h5 className="text-primary">{job.company_name}</h5>

          
          <h4 className="fw-bold mb-2">{job.j_name}</h4>

         
          <p className="mb-2">
            📍 <strong>Location:</strong> {job.location}
          </p>

        
          <div className="mb-2">
            <strong>Skills:</strong>
            <br />
            {job.skills.split(",").map((skill, i) => (
              <Badge bg="secondary" className="me-2 mt-2" key={i}>
                {skill.trim()}
              </Badge>
            ))}
          </div>
        </div>

        
        <div>
          <button className="btn btn-primary px-4 py-2" onClick={() => navigate('/jobseeker-login')}>Apply Now</button>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default ViewJobs;
