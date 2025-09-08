import { useState } from "react";
import { sendContactMessage } from "./services/contactService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    sendContactMessage(formData)
      .then((data) => {
        alert(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex justify-content-center ">
      <form
        className="p-4 rounded shadow bg-white text-dark w-100"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
         autoComplete="off"
      >
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
             autoComplete="new-password"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
             autoComplete="off"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Subject</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Enter Subject"
            value={formData.subject}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows={4}
            placeholder="Type your message"
            value={formData.message}
            onChange={handleChange}
             autoComplete="off"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-5 py-2"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
