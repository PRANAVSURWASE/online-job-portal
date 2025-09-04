import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    getJobSeekerProfile,
    getAllJobs,
    applyForJobs,
    getAppliedJobs,
    searchJobsByName,
} from './services/jobseekerService';

const JobSeekerProfile = () => {
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const fetchAppliedJobs = () => {
        const token = sessionStorage.getItem('jobSeekerToken');
        const uid = user.uid;

        if (!uid) return;
        getAppliedJobs(token)
            .then((res) => {
                setAppliedJobs(res.data.data || []);
            })
            .catch(() => setError('Failed to load applied jobs.'));
    };

    useEffect(() => {
        const token = sessionStorage.getItem('jobSeekerToken');
        if (!token) {
            navigate('/jobseeker-login');
            return;
        }

        if (location.state?.user) {
            setUser(location.state.user);
            setSuccess(location.state.msg || 'Profile updated successfully!');
            return;
        }

        getJobSeekerProfile(token)
            .then((res) => {
                setUser(res.data.user);
                sessionStorage.setItem('user', JSON.stringify(res.data.user));
            })
            .catch(() =>
                setError('Failed to fetch profile. Please log in again.')
            );
    }, [navigate, location.state]);

    // Auto-hide success/error after 3 sec
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    useEffect(() => {
        if (!user) return;
        const token = sessionStorage.getItem('jobSeekerToken');

        if (activeTab === 'all') {
            setLoadingJobs(true);
            getAllJobs()
                .then((res) => {
                    const jobsWithStatus = res.data.data.map((job) => ({
                        ...job,
                        applied: appliedJobs.some((aj) => aj.j_id === job.j_id),
                    }));
                    setJobs(jobsWithStatus);
                })
                .catch(() => setError('Failed to load jobs.'))
                .finally(() => setLoadingJobs(false));
        } else if (activeTab === 'applied') {
            setLoadingAppliedJobs(true);
            getAppliedJobs(token)
                .then((res) => {
                    setAppliedJobs(res.data.data || []);
                })
                .catch(() => setError('No  applied jobs.'))
                .finally(() => setLoadingAppliedJobs(false));
        }
    }, [activeTab, user]);

    const handleApplyJob = (j_id, hr_id) => {
        const token = sessionStorage.getItem('jobSeekerToken');
        const uid = user?.uid;

        if (!uid) {
            setError('User ID missing. Please login again.');
            return;
        }

        applyForJobs(token, hr_id, j_id)
            .then((res) => {
                setSuccess(res.data.msg);

                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job.j_id === j_id ? { ...job, applied: true } : job
                    )
                );

                fetchAppliedJobs();
            })
            .catch((err) => {
                if (err.response && err.response.data.msg) {
                    setError(err.response.data.msg);
                } else {
                    setError('Something went wrong while applying');
                }
            });
    };

   

    if (!user) return <p className="text-center mt-5">Loading profile...</p>;

    return (
        <div className="container-fluid" style={{ marginTop: '80px' }}>
            <div className="row">
                <div className="col-12">
                    {success && (
                        <div
                            className="alert alert-success text-center"
                            role="alert"
                        >
                            {success}
                        </div>
                    )}
                    {error && (
                        <div
                            className="alert alert-danger text-center"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}
                </div>

                <div className="col-md-3 bg-light p-4 shadow-sm rounded">
                    <h3 className="mb-4">Welcome 🤵 {user.name}</h3>
                    <ul className="list-unstyled">
                        <li>
                            <strong>Name:</strong> {user.name}
                        </li>
                        <li>
                            <strong>Email:</strong> {user.email}
                        </li>
                        <li>
                            <strong>Contact:</strong> {user.contact}
                        </li>
                        <li>
                            <strong>Skills:</strong> {user.skills}
                        </li>
                        <li>
                            <strong>Education:</strong> {user.education}
                        </li>
                    </ul>
                    <button
                        className="btn btn-primary w-100 mb-2"
                        onClick={() => navigate('/jobseeker-edit-profile')}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                            sessionStorage.removeItem('jobSeekerToken');
                            sessionStorage.removeItem('user');
                            navigate('/jobseeker-login');
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
                                    activeTab === 'all'
                                        ? 'btn-primary'
                                        : 'btn-outline-primary'
                                }`}
                                onClick={() => setActiveTab('all')}
                            >
                                View All Jobs
                            </button>
                            <button
                                className={`btn ${
                                    activeTab === 'applied'
                                        ? 'btn-primary'
                                        : 'btn-outline-primary'
                                }`}
                                onClick={() => setActiveTab('applied')}
                            >
                                Applied Jobs
                            </button>
                        </div>

                        {activeTab === 'all' && (
                            <div>
                                {/* Search Bar */}
                                <input
                                    type="text"
                                    placeholder="🔎 Search jobs..."
                                    className="form-control mb-3"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                {loadingJobs ? (
                                    <p>Loading jobs...</p>
                                ) : jobs.length > 0 ? (
                                    <ul className="list-group">
                                        {jobs
                                            .filter((job) =>
                                                [
                                                    job.j_name,
                                                    job.location,
                                                    job.skills,
                                                ]
                                                    .join(' ')
                                                    .toLowerCase()
                                                    .includes(
                                                        searchQuery.toLowerCase()
                                                    )
                                            )

                                            .map((job) => (
                                                <li
                                                    key={job.j_id}
                                                    className="list-group-item"
                                                >
                                                    <h4>
                                                        <strong>Role:</strong>{' '}
                                                        {job.j_name}
                                                    </h4>
                                                    <p className="mb-1">
                                                        <strong>
                                                            Company:
                                                        </strong>{' '}
                                                        {job.company_name}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>
                                                            Location:
                                                        </strong>{' '}
                                                        {job.location}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Skills:</strong>{' '}
                                                        {job.skills}
                                                    </p>
                                                    <button
                                                        className={`btn btn-sm mt-2 ${
                                                            job.applied
                                                                ? 'btn-success'
                                                                : 'btn-primary'
                                                        }`}
                                                        onClick={() =>
                                                            handleApplyJob(
                                                                job.j_id,
                                                                job.hr_id
                                                            )
                                                        }
                                                        disabled={job.applied}
                                                    >
                                                        {job.applied
                                                            ? 'Applied'
                                                            : 'Apply Now'}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    <p>No jobs available</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'applied' && (
                            <div>
                                {loadingAppliedJobs ? (
                                    <p>Loading applied jobs...</p>
                                ) : appliedJobs.length > 0 ? (
                                    <ul className="list-group">
                                        {appliedJobs.map((job) => (
                                            <li
                                                key={job.j_id}
                                                className="list-group-item"
                                            >
                                                <h4>
                                                    <strong>Role:</strong>{' '}
                                                    {job.j_name}
                                                </h4>
                                                <p className="mb-1">
                                                    <strong>Location:</strong>{' '}
                                                    {job.location}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Skills:</strong>{' '}
                                                    {job.skills}
                                                </p>
                                                <p>
                                                    <strong>Applied At:</strong>{' '}
                                                    {new Date(
                                                        job.apply_date
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No applied jobs yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerProfile;
