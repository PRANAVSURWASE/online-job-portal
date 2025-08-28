import { Container, Row, Col } from 'react-bootstrap';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" text-black py-5">
      <Container>
        <Row>
          {/* Company Info */}
          <Col lg={4} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <Briefcase size={24} className="me-2" />
              <h5 className="mb-0 fw-bold">JobSpot</h5>
            </div>
            
            
            {/* Contact Info */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <Mail size={16} className="me-2" />
                <span>contact@jobspot.com</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Phone size={16} className="me-2" />
                <span>+91 1234567890</span>
              </div>
              <div className="d-flex align-items-center">
                <MapPin size={16} className="me-2" />
                <span>123 Business Ave, Tech City, PUNE 12345</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white">
                <Instagram size={20} />
              </a>
            </div>
          </Col>
          
          {/* For Job Seekers */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">For Job Seekers</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none ">Browse Jobs</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Career Advice</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Resume Builder</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Salary Guide</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Job Alerts</a></li>
            </ul>
          </Col>
          
          {/* For Employers */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">For Employers</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Post a Job</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Browse Resumes</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Hiring Solutions</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Employer Branding</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Pricing</a></li>
            </ul>
          </Col>
          
          {/* Company */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">About Us</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Careers</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Press</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Blog</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          
          {/* Legal */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Cookie Policy</a></li>
              <li className="mb-2"><a href="#" className="d-flex align-items-center mb-2 text-decoration-none">Accessibility</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="d-flex align-items-center mb-2 text-decoration-none">
              © 2025 JobSpot. All rights reserved.
            </p>
          </Col>
          
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;