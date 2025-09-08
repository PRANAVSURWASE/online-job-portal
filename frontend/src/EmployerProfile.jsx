import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getEmployerProfile,
  getEmployerJobs,
  deleteJob,
  createJob,
  getApplicants,
  updateJob,
  getScheduledInterviews,
  searchJobsByName,
  downloadResume, // Add this import
} from "./services/employerService";
import {
  scheduleInterview,
  rejectApplication,
} from "./services/scheduleServices";

const EmployerProfile = () => {
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [isRejecting, setIsRejecting] = useState(false);
  const [downloadingResume, setDownloadingResume] = useState(null); // Track which resume is downloading

  const [jobForm, setJobForm] = useState({
    j_name: "",
    location: "",
    skills: "",
  });
  const [applicants, setApplicants] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
    mode: "ONLINE",
    location: "",
    meetingLink: "",
    notes: "",
  });

  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  // Add download resume function
  const handleDownloadResume = async (applicant) => {
    const token = sessionStorage.getItem("employerToken");
    if (!token) return;
    
    try {
      setDownloadingResume(applicant.uid); // Show loading state
      
      // Extract filename from the resume_file path
      const filename = applicant.resume_file.split('/').pop();
      
      const response = await downloadResume(filename, token);
      
      // Create blob and download
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${applicant.name}_Resume_${filename}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.log('Download error:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setDownloadingResume(null);
    }
  };

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

  useEffect(() => {
    const token = sessionStorage.getItem("employerToken");
    if (activeTab === "search" && searchQuery) {
      setIsSearching(true);
      searchJobsByName(searchQuery, token)
        .then((res) => setSearchResults(res.data.data || []))
        .catch(() => setSearchResults([]))
        .finally(() => setIsSearching(false));
    } else {
      setSearchResults([]);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    if (activeTab === "applicants") {
      const token = sessionStorage.getItem("employerToken");
      if (!token) return;
      setLoading(true);
      getApplicants(token)
        .then((res) => setApplicants(res.data.apply_jobs || []))
        .catch(() => setError("Failed to load applicants."))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

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

  const handleInterviewsClick = () => {
    setActiveTab("interviews");

    const token = sessionStorage.getItem("employerToken");
    if (!token) return;

    setLoading(true);
    getScheduledInterviews(token)
      .then((res) => setInterviews(res.data.data || []))
      .catch(() => {
        setInterviews([]);
      })
      .finally(() => setLoading(false));
  };

  // Create Job
  const handleCreateJob = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("employerToken");
    createJob(jobForm, token)
      .then((res) => {
        alert(res.data.msg || "Job created successfully");
        setJobs((prev) => [res.data.job, ...prev]);
        setShowJobForm(false);
        setJobForm({ j_name: "", location: "", skills: "" });
      })
      .catch(() => alert("Failed to create job"));
  };

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

  const handleReject = (uid, j_id) => {
    setIsRejecting(true);
    rejectApplication(uid, j_id)
      .then(() => {
        const token = sessionStorage.getItem("employerToken");
        getApplicants(token)
          .then((res) => setApplicants(res.data.apply_jobs || []))
          .catch(() => setError("Failed to load applicants."));
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Failed to reject application");
      })
      .finally(() => setIsRejecting(false));
  };

  const handleSchedule = (applicant) => {
    console.log("Applicant object:", applicant);
    setSelectedApplicant(applicant);
    setShowScheduleModal(true);
  };

  const submitSchedule = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("employerToken");

    if (!selectedApplicant) return alert("No applicant selected");

    try {
      const res = await scheduleInterview(token, {
        uid: selectedApplicant.uid,
        j_id: selectedApplicant.j_id,
        ...scheduleForm,
      });

      alert(res.data.msg || "Interview scheduled successfully");

      getScheduledInterviews(token)
        .then((res) => setInterviews(res.data.data || []))
        .catch(() => setError("Failed to load scheduled interviews."));

      setShowScheduleModal(false);
      setScheduleForm({
        date: "",
        time: "",
        mode: "ONLINE",
        location: "",
        meetingLink: "",
        notes: "",
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to schedule interview");
    }
  };

  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!employer) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container-fluid " style={{ marginTop: "65px" }}>
      <div className="row">
        <div className="col-md-3 bg-light p-4 shadow-sm rounded">
          <h3 className="mb-4">Welcome 🤵 {employer.name}</h3>
          <ul className="list-unstyled">
            <li>
              <strong>Name:</strong> {employer.name}
            </li>
            <li>
              <strong>Email:</strong> {employer.email}
            </li>
            <li>
              <strong>Contact:</strong> {employer.contact}
            </li>
            <li>
              <strong>Company:</strong> {employer.company_name}
            </li>
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
                onClick={handleInterviewsClick}
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
                <input
                  type="text"
                  placeholder="🔎 Search jobs..."
                  className="form-control mb-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

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
                          setJobForm({
                            ...jobForm,
                            j_name: e.target.value,
                          })
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
                          setJobForm({
                            ...jobForm,
                            location: e.target.value,
                          })
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
                          setJobForm({
                            ...jobForm,
                            skills: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">
                      {editingJob ? "Update Job" : "Save Job"}
                    </button>
                  </form>
                )}
                <button
                  className={`btn me-2 ${
                    activeTab === "jobs" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => {
                    if (showJobForm) {
                      setShowJobForm(false);
                      setEditingJob(null);
                      setJobForm({ j_name: "", location: "", skills: "" });
                    } else {
                      setShowJobForm(true);
                    }
                  }}
                >
                  {showJobForm ? "Cancel" : "Create Job"}
                </button>
                {loading ? (
                  <p>Loading jobs...</p>
                ) : (
                  <ul className="list-group">
                    {jobs
                      .filter((job) =>
                        job.j_name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((job) => (
                        <li key={job.j_id} className="list-group-item">
                          <h4>
                            <strong>Role:</strong> {job.j_name}
                          </h4>
                          <p>
                            <strong>Location:</strong> {job.location}
                          </p>
                          <p>
                            <strong>Skills:</strong> {job.skills}
                          </p>
                          <p>
                            <strong>Posted On:</strong>{" "}
                            {new Date(job.posted_date).toLocaleString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <button
                            className="btn btn-danger btn-sm mt-2 me-2"
                            onClick={() => handleDeleteJob(job.j_id)}
                          >
                            Delete Job
                          </button>

                          <button
                            className="btn btn-primary btn-sm mt-2 me-2"
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
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === "interviews" && (
              <div>
                {loading ? (
                  <p>Loading scheduled interviews...</p>
                ) : interviews.length > 0 ? (
                  <div className="row">
                    {interviews.map((interview, i) => (
                      <div key={i} className="col-md-6 mb-3">
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title">{interview.jobTitle}</h5>
                            <p className="card-text">
                              <strong>Candidate:</strong>{" "}
                              {interview.candidateName}
                            </p>
                            <p className="card-text">
                              <strong>Date:</strong>{" "}
                              {new Date(interview.date).toLocaleDateString()}
                            </p>
                            <p className="card-text">
                              <strong>Time:</strong> {interview.time}
                            </p>
                            <p className="card-text">
                              <strong>Mode:</strong>{" "}
                              <span
                                className={`badge ${
                                  interview.mode === "ONLINE"
                                    ? "bg-success"
                                    : "bg-primary"
                                }`}
                              >
                                {interview.mode}
                              </span>
                            </p>
                            {interview.mode === "ONLINE" && (
                              <p className="card-text">
                                <strong>Meeting Link:</strong>{" "}
                                <a
                                  href={interview.meetingLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {interview.meetingLink}
                                </a>
                              </p>
                            )}
                            {interview.location && (
                              <p className="card-text">
                                <strong>Location:</strong> {interview.location}
                              </p>
                            )}
                            {interview.notes && (
                              <p className="card-text">
                                <strong>Notes:</strong> {interview.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Once you schedule interviews, they will appear here.</p>
                )}
              </div>
            )}

            {activeTab === "applicants" && (
              <div>
                {loading ? (
                  <p>Loading applicants...</p>
                ) : applicants.length > 0 ? (
                  <ul className="list-group">
                    {applicants.map((applicant, i) => (
                      <li key={i} className="list-group-item">
                        <p>
                          <strong>Name:</strong>{" "}
                          <span className="ms-2">{applicant.name}</span>
                        </p>
                        <p>
                          <strong>Email:</strong> {applicant.email}
                        </p>
                        <p>
                          <strong>Contact:</strong> {applicant.contact}
                        </p>
                        <p>
                          <strong>Education:</strong> {applicant.education}
                        </p>
                        <p>
                          <strong>Skills:</strong> {applicant.skills}
                        </p>
                        <p>
                          <strong>Applied For:</strong> {applicant.j_name}
                        </p>
                        <p>
                          <strong>Applied On:</strong>{" "}
                          {new Date(applicant.apply_date).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                        
                        <div className="d-flex gap-2">
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => handleDownloadResume(applicant)}
                            disabled={downloadingResume === applicant.uid}
                          >
                            {downloadingResume === applicant.uid 
                              ? "Downloading..." 
                              : "Download Resume"
                            }
                          </Button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleSchedule(applicant)}
                          >
                            Schedule Interview
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to reject this application?"
                                )
                              ) {
                                handleReject(applicant.uid, applicant.j_id);
                              }
                            }}
                            disabled={isRejecting}
                          >
                            {isRejecting
                              ? "Rejecting..."
                              : "Reject Application"}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No applicants found yet.</p>
                )}
              </div>
            )}

            <Modal
              show={showScheduleModal}
              onHide={() => setShowScheduleModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Schedule Interview{" "}
                  {selectedApplicant ? `for ${selectedApplicant.name}` : ""}
                </Modal.Title>
              </Modal.Header>
              <Form onSubmit={submitSchedule}>
                <Modal.Body>
                  <Form.Group className="mb-2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={scheduleForm.date}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={scheduleForm.time}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          time: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Mode</Form.Label>
                    <Form.Select
                      value={scheduleForm.mode}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          mode: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="ONLINE">ONLINE</option>
                      <option value="OFFLINE">OFFLINE</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={scheduleForm.location}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          location: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Meeting Link</Form.Label>
                    <Form.Control
                      type="text"
                      value={scheduleForm.meetingLink}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          meetingLink: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={scheduleForm.notes}
                      onChange={(e) =>
                        setScheduleForm({
                          ...scheduleForm,
                          notes: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowScheduleModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="success">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;