import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployerProfile,
  getEmployerJobs,
  deleteJob,
  createJob,
} from "./services/employerService";

const EmployerProfile = () => {
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    j_name: "",
    location: "",
    skills: "",
  });

  const navigate = useNavigate();

  // Fetch Employer Profile
  useEffect(() => {
    const token = sessionStorage.getItem("employerToken");
    if (!token) {
      navigate("/employer-login");
      return;
    }

    getEmployerProfile(token)
      .then((res) => {
        setEmployer(res.data.hr);
        sessionStorage.setItem("employer", JSON.stringify(res.data.hr));
      })
      .catch(() => setError("Failed to fetch profile. Please log in again."));
  }, [navigate]);

  // Fetch Employer Jobs (only needs token now)
  useEffect(() => {
    const token = sessionStorage.getItem("employerToken");
    if (!token) return;

    setLoading(true);
    getEmployerJobs(token)
      .then((res) => setJobs(res.data.data || []))
      .catch(() => setError("Failed to load jobs."))
      .finally(() => setLoading(false));
  }, []);

  // Delete Job
  const handleDeleteJob = (j_id) => {
    console.log("Deleting job with ID:", j_id);
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const token = sessionStorage.getItem("employerToken");
    console.log("Token:",token);
    deleteJob(j_id, token)
      .then((res) => {
        alert(res.data.msg);
        setJobs((prev) => prev.filter((job) => job.j_id !== j_id));
      })
      .catch(() => alert("Failed to delete job"));
  };

  //  Create Job
  const handleCreateJob = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("employerToken");

    createJob(jobForm, token)
      .then((res) => {
        alert(res.data.msg || "Job created successfully");
        setJobs((prev) => [...prev, res.data.job]); 
        setShowJobForm(false);
        setJobForm({ j_name: "", location: "", skills: "" });
      })
      .catch(() => alert("Failed to create job"));
  };

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!employer) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="row">
        
        <div className="col-md-3 bg-light p-4 shadow-sm rounded">
          <h3 className="mb-4">Welcome 🏢 {employer.name}</h3>
          <ul className="list-unstyled">
            <li><strong>Name:</strong> {employer.name}</li>
            <li><strong>Email:</strong> {employer.email}</li>
            <li><strong>Contact:</strong> {employer.contact}</li>
            <li><strong>Company:</strong> {employer.company_name}</li>
          </ul>
        
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              sessionStorage.clear();
              navigate("/employer-login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="p-4 rounded shadow bg-white">
            {/* Tabs */}
            <div className="d-flex mb-3">
              <button
                className={`btn me-2 ${
                  activeTab === "jobs" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                My Jobs
              </button>
              <button
                className={`btn ${
                  activeTab === "interviews" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("interviews")}
              >
                Scheduled Interviews
              </button>
            </div>

            {/* Jobs Tab */}
            {activeTab === "jobs" && (
              <div>
                <button
                  className="btn btn-success mb-3"
                  onClick={() => setShowJobForm(!showJobForm)}
                >
                  {showJobForm ? "Cancel" : "Create Job"}
                </button>

                {showJobForm && (
                  <form onSubmit={handleCreateJob} className="mb-3">
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                        value={jobForm.j_name}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, j_name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        value={jobForm.location}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, location: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Skills"
                        value={jobForm.skills}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, skills: e.target.value })
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Job
                    </button>
                  </form>
                )}

                {loading ? (
                  <p>Loading jobs...</p>
                ) : jobs.length > 0 ? (
                  <ul className="list-group">
                    {jobs.map((job) => (
                      <li key={job.j_id} className="list-group-item">
                        <h4><strong>Role:</strong> {job.j_name}</h4>
                        <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                        <p className="mb-1"><strong>Skills:</strong> {job.skills}</p>
                        <p className="mb-1"><strong>Posted On:</strong> {job.posted_date}</p>
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleDeleteJob(job.j_id)}
                        >
                          Delete Job
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No jobs posted yet.</p>
                )}
              </div>
            )}

            {/* Interviews Tab */}
            {activeTab === "interviews" && (
              <div>
                <p>Coming soon: Scheduled Interviews list here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
