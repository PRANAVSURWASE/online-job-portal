import { useState } from 'react';

import { sendContactMessage } from './services/contactService';

const ContactForm = () => {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  let [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
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
    <form className="p-4 rounded shadow bg-white" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name" 
          className="form-control"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          type="text"
          name="subject"
          className="form-control"
          placeholder="Enter Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          name="message"
          className="form-control"
          rows={5}
          placeholder="Type your message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
