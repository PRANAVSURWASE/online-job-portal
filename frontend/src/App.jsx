import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Globe } from "lucide-react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import JobCategoriesSection from "./JobCategoriesSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import ContactPage from "./ContactPage";
import EmployerLogin from "./EmployerLogin";
import EmployerRegister from "./EmployerRegister";
import JobSeekerLogin from "./JobSeekerLogin";
import JobSeekerRegister from "./JobSeekerRegister"; 
import Auth  from "./Auth"; // Assuming Auth is a component for authentication 
import JobSeekerProfile from "./JobSeekerProfile"; 
import EmployerProfile from "./EmployerProfile"; 
import About from "./About";
import JobSeekerEditProfile from "./JobSeekerEditProfile";
import AdminProfile from "./AdminProfile";
import Companies from "./companies";
import ViewJobs from "./ViewJobs"

const HomePage = () => (
  <>
    <HeroSection />
    <JobCategoriesSection />
    <CTASection />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
     <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-companies" element={<Companies />}/>
        <Route path="/view-jobs" element={<ViewJobs/>}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/employer-register" element={<EmployerRegister />} />
        <Route path="/employer-login" element={<EmployerLogin />} />
        <Route path="/employer-profile" element={<EmployerProfile />} />
        <Route path="/jobseeker-register" element={<JobSeekerRegister />} />
        <Route path="/jobseeker-login" element={<JobSeekerLogin />} />
        <Route path="/jobseeker-profile" element={<JobSeekerProfile />} />
        <Route path="/jobseeker-edit-profile" element={<JobSeekerEditProfile />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};
export default App;