import React from "react";
const About = () => {
  return (
    <section className="py-5 bg-light" id="about">
      <div className="container" style={{ marginTop: "50px", width: "800px" }}>
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-8">
            <h2 className="fw-bold">About Our Job Portal</h2>
            <p className="text-muted">
              Our online job portal helps connect job seekers with employers. 
              Whether you are searching for your dream job or the right candidate, 
              we make the process simple, fast, and effective.
            </p>
          </div>
        </div>
        
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <h5 className="fw-semibold">For Job Seekers</h5>
              <p className="text-muted">
                Explore thousands of job opportunities and apply with ease.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <h5 className="fw-semibold">For Employers</h5>
              <p className="text-muted">
                Post jobs, manage applications, and hire the best talent.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 shadow-sm rounded bg-white h-100">
              <h5 className="fw-semibold">Career Growth</h5>
              <p className="text-muted">
                Get career resources, tips, and guidance to move ahead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
