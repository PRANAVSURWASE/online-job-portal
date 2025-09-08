import { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { getEnquiries } from "./services/adminService";
import axios from "axios";

const EnquiryList = ({ showModal, setShowModal, token }) => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    if (showModal) {
      fetchEnquiries();
    }
  }, [showModal]);

  const fetchEnquiries = async () => {
    try {
      const response = await getEnquiries(token);
      setEnquiries(response.data.data || []);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/deleteEnquiry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(enquiries.filter((enq) => enq.id !== id));
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
      <Modal.Header closeButton className="hero-gradient no-border">
        <Modal.Title className="w-100 text-center hero-gradient text-white">
          Enquiry List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="hero-gradient">
        {enquiries.length > 0 ? (
          <div className="d-flex justify-content-center">
            <Table striped bordered hover responsive className="text-center w-95">
              <thead>
                <tr>
                  <th>SR No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq, index) => (
                  <tr key={enq.id}>
                    <td>{index + 1}</td>
                    <td>{enq.name}</td>
                    <td>{enq.email}</td>
                    <td>{enq.subject}</td>
                    <td>{enq.message}</td>
                    <td>{new Date(enq.created_at).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(enq.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="text-center">No enquiries found.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EnquiryList;