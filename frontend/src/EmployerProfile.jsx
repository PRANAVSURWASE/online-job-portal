import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployerProfile,
  getEmployerJobs,
  deleteJob,
  createJob,
  getApplicants,
  updateJob,   // ✅ import updateJob service
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

  const [editingJob, setEditingJob] = useState(null); // ✅ track job being edited
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

  // Fetch Employer Jobs
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
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const token = sessionStorage.getItem("employerToken");

    deleteJob(j_id, token)
      .then((res) => {
        alert(res.data.msg);
        setJobs((prev) => prev.filter((job) => job.j_id !== j_id));
      })
      .catch(() => alert("Failed to delete job"));
  };

  // Create Job
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

  // ✅ Update Job
  const handleUpdateJob = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("employerToken");
    if (!editingJob) return;

    updateJob(editingJob.j_id, jobForm, token)
      .then((res) => {
        alert(res.data.msg || "Job updated successfully");
        setJobs((prev) =>
          prev.map((job) =>
            job.j_id === editingJob.j_id ? { ...job, ...jobForm } : job
          )
        );
        setEditingJob(null);
        setJobForm({ j_name: "", location: "", skills: "" });
      })
      .catch(() => alert("Failed to update job"));
  };

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!employer) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="row">
        {/* Employer Info */}
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

        {/* Jobs Section */}
        <div className="col-md-9">
          <div className="p-4 rounded shadow bg-white">
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
                className={`btn me-2 ${
                  activeTab === "interviews"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("interviews")}
              >
                Scheduled Interviews
              </button>
              <button
                className={`btn ${
                  activeTab === "applicants"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("applicants")}
              >
                Applicants
              </button>
            </div>

            {activeTab === "jobs" && (
              <div>
                {/* ✅ Job Form (Create / Update) */}
                {(showJobForm || editingJob) && (
                  <form
                    onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
                    className="mb-3"
                  >
                    <h5>{editingJob ? "Update Job" : "Create Job"}</h5>
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
                    <button type="submit" className="btn btn-primary me-2">
                      {editingJob ? "Update Job" : "Save Job"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingJob(null);
                        setShowJobForm(false);
                        setJobForm({ j_name: "", location: "", skills: "" });
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {!editingJob && !showJobForm && (
                  <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowJobForm(true)}
                  >
                    Create Job
                  </button>
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
                        <div className="d-flex mt-2">
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => handleDeleteJob(job.j_id)}
                          >
                            Delete Job
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setEditingJob(job);
                              setJobForm({
                                j_name: job.j_name,
                                location: job.location,
                                skills: job.skills,
                              });
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No jobs posted yet.</p>
                )}
              </div>
            )}

            {activeTab === "interviews" && <p>Coming soon...</p>}
            {activeTab === "applicants" && <p>Applicants list here...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
