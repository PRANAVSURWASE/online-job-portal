import { useState, useEffect } from "react";
import { useNavigate ,} from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {  getEmployerProfile,getEmployerJobs,deleteJob,createJob,getApplicants } from "./services/employerService";
import { scheduleInterview } from "./services/scheduleServices";


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
  const [applicants, setApplicants] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
   const [selectedApplicant, setSelectedApplicant] = useState(null);

     const [scheduleForm, setScheduleForm] = useState({
      date: "",
      time: "",
      mode: "ONLINE",
      location: "",
      meetingLink: "",
      notes: "",
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

  const handleSchedule = (applicant) => {
    console.log("Applicant object:", applicant);
  setSelectedApplicant(applicant);
  setShowScheduleModal(true);
};
  // Submit Interview Schedule
  const submitSchedule = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("employerToken");

    if (!selectedApplicant) return alert("No applicant selected");

    try {
      const res = await scheduleInterview(token, {
        uid: selectedApplicant.uid,   // applicant ID
        j_id: selectedApplicant.j_id, // job ID
        
        ...scheduleForm,
      });
      

      alert(res.data.msg || "Interview scheduled successfully");

      // Reset form + close modal
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
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="row">
        
        <div className="col-md-3 bg-light p-4 shadow-sm rounded">
          <h3 className="mb-4">Welcome 🤵‍♂️ </h3>
          <h3><p><strong>{employer.name}</strong></p></h3>
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
                  activeTab === "interviews" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("interviews")}
              >
                Scheduled Interviews
              </button>
              <button
              className={`btn ${activeTab === "applicants" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("applicants")}
               >Applicants</button>
            </div>

           
            {activeTab === "jobs" && (
              <div>
                <button
                  className="btn btn-primary mb-3"
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
                        <p className="mb-1"><strong>Posted On:</strong>{" "}
                        {new Date(job.posted_date).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        })}
                        </p>
                        <button
                          className="btn btn-danger btn-sm mt-2 me-2"
                          onClick={() => handleDeleteJob(job.j_id)}
                        >
                          Delete Job
                        </button>
                        
                        <button className="btn btn-primary btn-sm mt-2" >Update</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No jobs posted yet.</p>
                )}
              </div>
            )}

            
            {activeTab === "interviews" && (
              <div>
                <p>Coming soon: Scheduled Interviews list here...</p>
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
            <p><strong>Name:</strong> <span className="ms-2">{applicant.name}</span></p>
            <p><strong>Email:</strong> {applicant.email}</p>
            <p><strong>Contact:</strong> {applicant.contact}</p>
            <p><strong>Applied For:</strong> {applicant.j_name}</p>
            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(applicant.apply_date).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            
             <button
                className="btn btn-success btn-sm"
                onClick={() => handleSchedule(applicant)}
                > Schedule Interview
              </button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No applicants found yet.</p>
    )}
  </div>
)}
  <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>
      Schedule Interview {selectedApplicant ? `for ${selectedApplicant.name}` : ""}
    </Modal.Title>
  </Modal.Header>
  <Form onSubmit={submitSchedule}>
    <Modal.Body>
      <Form.Group className="mb-2">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={scheduleForm.date}
          onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          value={scheduleForm.time}
          onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Mode</Form.Label>
        <Form.Select
          value={scheduleForm.mode}
          onChange={(e) => setScheduleForm({ ...scheduleForm, mode: e.target.value })}
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
          onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Meeting Link</Form.Label>
        <Form.Control
          type="text"
          value={scheduleForm.meetingLink}
          onChange={(e) => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={scheduleForm.notes}
          onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
        />
      </Form.Group>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
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
