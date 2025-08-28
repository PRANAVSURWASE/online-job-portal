import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  Code, 
  Palette, 
  BarChart3, 
  Megaphone, 
  Shield, 
  Stethoscope,
  GraduationCap,
  Wrench
} from 'lucide-react';

const JobCategoriesSection = () => {
  const categories = [
    {
      icon: Code,
      title: "Technology",
      jobs: 15420,
      description: "Software development, web design, and IT support roles"
    },
    {
      icon: Palette,
      title: "Design & Creative",
      jobs: 8350,
      description: "UI/UX design, graphic design, and creative positions"
    },
    {
      icon: BarChart3,
      title: "Business & Finance",
      jobs: 12680,
      description: "Financial analysis, consulting, and business development"
    },
    {
      icon: Megaphone,
      title: "Marketing & Sales",
      jobs: 9840,
      description: "Digital marketing, sales, and brand management roles"
    },
    {
      icon: Shield,
      title: "Security",
      jobs: 4220,
      description: "Cybersecurity, risk management, and safety positions"
    },
    {
      icon: Stethoscope,
      title: "Healthcare",
      jobs: 7150,
      description: "Medical professionals, healthcare administration"
    },
    {
      icon: GraduationCap,
      title: "Education",
      jobs: 5680,
      description: "Teaching, training, and educational technology"
    },
    {
      icon: Wrench,
      title: "Engineering",
      jobs: 11350,
      description: "Mechanical, electrical, and civil engineering roles"
    }
  ];

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold mb-3">Explore Job Categories</h2>
            <p className="lead text-muted">
              Discover opportunities across various industries and find the perfect role for your skills.
            </p>
          </Col>
        </Row>
        
        <Row>
          {categories.map((category, index) => (
            <Col key={index} lg={3} md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm card-hover">
                <Card.Body className="text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '60px', height: '60px' }}>
                    <category.icon size={30} className="text-primary" />
                  </div>
                  <Card.Title className="h5 mb-2">{category.title}</Card.Title>
                  <p className="text-primary fw-bold mb-2">{category.jobs.toLocaleString()} jobs</p>
                  <Card.Text className="text-muted small">
                    {category.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default JobCategoriesSection;