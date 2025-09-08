import { useEffect, useState } from "react";
import { getAllCompanies } from "./services/companyService";
import { Card, Alert, Row, Col } from "react-bootstrap";


const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCompanies()
      .then((uniqueCompanies) => {
        if (uniqueCompanies.length > 0) {
          setCompanies(uniqueCompanies);
        } else {
          setError("No companies found");
        }
      })
      .catch(() => {
        setError("Failed to fetch companies");
      });
  }, []);

  return (
    <section
      className="hero-gradient text-white py-5"
      style={{ marginTop: "58px", minHeight: "90vh" }}
    >
      <div className="container">
        <h2 className="text-center mb-4">🏢 Companies</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-4">
          {companies.map((company, index) => (
            <Col md={4} sm={6} xs={12} key={index}>
              <Card className="shadow-sm border-0 h-100 bg-white text-dark">
                <Card.Body className="text-center">
                  <Card.Title>{company}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Companies;
