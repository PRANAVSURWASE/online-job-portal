import ContactForm from "./ContactForm";

const ContactPage = () => (
  <section
    className="hero-gradient text-white py-3"
    style={{ marginTop: "58px", minHeight: "90vh" }}
  >
    <div className="container">
      <h2 className="text-center mb-4">Contact Us</h2>
      
        <ContactForm />
      </div>
    
  </section>
);

export default ContactPage;
