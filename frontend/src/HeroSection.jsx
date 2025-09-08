import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Search, TrendingUp, Users, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats } from './services/adminService';

const HeroSection = ({token}) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ userCount: 0, hrCount: 0, jobCount: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminStats(token);
        const { userCount, hrCount, jobCount } = response.data;
        setStats({ userCount, hrCount, jobCount });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      }
    };
    if (token) {
      fetchStats();
    }
  }, [token]);

  // Define statsDisplay here so it re-evaluates on every render with the new `stats` state
  const statsDisplay = [
    { icon: TrendingUp, count: stats.jobCount, label: "Active Jobs" },
    { icon: Building, count: stats.hrCount, label: "Companies" },
    { icon: Users, count: stats.userCount, label: "Job Seekers" }
  ];

  const popularSearches = [
    "Frontend Developer", "Data Scientist", "Product Manager", 
    "UX Designer", "DevOps Engineer", "Marketing Manager"
  ];

  const handleApplyNow = () => {
    const isLoggedIn = localStorage.getItem("jobSeekerToken");
    const isRegistered = localStorage.getItem("jobSeekerRegistered");

    if (isLoggedIn) {
      navigate("/apply-job");
    } else if (isRegistered) {
      navigate("/jobseeker-login");
    } else {
      navigate("/jobseeker-register");
    }
  };

  return (
    <section className="hero-gradient text-white py-5" style={{ marginTop: '5px', minHeight: '90vh' }}>
      <Container className="h-100">
        <Row className="align-items-center h-100 py-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold mb-4 hero-title">
              Find Your Dream Job Today
            </h1>
            <p className="lead mb-4 hero-subtitle">
              Connect with top employers and discover amazing career opportunities 
              that match your skills and aspirations.
            </p>
            
            <div className="bg-white rounded-3 p-4 mb-4">
              <Row>
                <Col md={8} className="mb-3 mb-md-0">
                  <div className="position-relative">
                    <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
                    <input
                      type="text"
                      placeholder="Job title or keyword"
                      className="ps-5 border-0 bg-light form-control"
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <Button variant="primary" className="w-100">
                    Search
                  </Button>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <p className="mb-2">Popular searches:</p>
              <div className="d-flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="px-3 py-2 rounded-pill cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            <Row className="mt-5">
              {statsDisplay.map((stat, index) => (
                <Col key={index} md={4} className="text-center mb-3">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <stat.icon size={24} className="me-2 float-animation" />
                    <span className="h4 mb-0 fw-bold">{stat.count}</span>
                  </div>
                  <p className="mb-0 small">{stat.label}</p>
                </Col>
              ))}
            </Row>
          </Col>
          
          <Col lg={6}>
            <div className="text-center">
              <div className="bg-white rounded-3 p-4 shadow-lg">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary rounded-circle p-2 me-3">
                    <Building size={20} className="text-white" />
                  </div>
                  <div className="text-start">
                    <h6 className="mb-0 text-dark fw-bold">Senior Frontend Developer</h6>
                    <small className="text-muted">TechCorp Inc.</small>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg="success" className="rounded-pill">Remote</Badge>
                  <span className="fw-bold text-primary">3,50,000 - 7,00,000</span>
                </div>
                <p className="text-muted small mb-3">
                  Join our dynamic team and work on cutting-edge projects with modern technologies.
                </p>
                <Button variant="primary" className="w-100" onClick={handleApplyNow}>
                  Apply Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;