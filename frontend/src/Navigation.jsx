import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Briefcase, Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold"
        >
          <Briefcase className="me-2" size={24} color="#0d6efd" />
          JobSpot
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="border-0"
        >
          {expanded ? <X size={24} /> : <Menu size={24} />}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/view-jobs" className="mx-2">
              Find Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/view-companies" className="mx-2">
              Companies
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to="/auth"
              variant="outline-primary"
              className="me-2"
            >
              Sign In
            </Button>
            <Button variant="primary">Get Started</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
