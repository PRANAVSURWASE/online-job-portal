import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowRight, Users, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 bg-primary text-white">
      <Container>
        {/* Two-column CTA */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <Card className="bg-white text-dark h-100 border-0 shadow">
              <Card.Body className="p-4 text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                     style={{ width: '60px', height: '60px' }}>
                  <Users size={30} className="text-primary" />
                </div>
                <Card.Title className="h4 mb-3">For Job Seekers</Card.Title>
                <Card.Text className="mb-4">
                  Discover thousands of job opportunities from top companies. 
                  Build your professional profile and get noticed by recruiters.
                </Card.Text>
                <Button variant="primary" className="d-flex align-items-center justify-content-center mx-auto"onClick={() => navigate('/jobseeker-login')}>
                  Find Jobs <ArrowRight size={18} className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6}>
            <Card className="bg-white text-dark h-100 border-0 shadow">
              <Card.Body className="p-4 text-center">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                     style={{ width: '60px', height: '60px' }}>
                  <Building size={30} className="text-success" />
                </div>
                <Card.Title className="h4 mb-3">For Employers</Card.Title>
                <Card.Text className="mb-4">
                  Post jobs and connect with qualified candidates. 
                  Use our advanced tools to find the perfect fit for your team.
                </Card.Text>
                <Button variant="success"  className="d-flex align-items-center justify-content-center mx-auto" onClick={() => navigate('/employer-login')}>
                  Post Jobs <ArrowRight size={18} className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Bottom CTA */}
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-6 fw-bold mb-3">Ready to Get Started?</h2>
            <p className="lead mb-4">
              Join thousands of professionals who have found their perfect job match through our platform.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button variant="light" size="lg" className="px-4">
                Sign Up Now
              </Button>
              <Button variant="outline-light" size="lg" className="px-4">
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTASection;