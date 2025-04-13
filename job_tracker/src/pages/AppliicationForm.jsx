import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { JobContext } from "../store/JobContext";

const ApplicationForm = () => {
  const { currJobId, allJobs, applyJob } = useContext(JobContext);
  const selectedJob = allJobs.find((job) => job.id === currJobId);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currJobId) {
      alert("No job selected. Please go back and choose a job.");
      return;
    }

    const { phone, resume } = formData;
    applyJob({ phone, resume });
  };

  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold display-4 text-secondary">
            Job Application Form
          </h2>
          <p className="text-muted fs-5">
            Please complete the form below to apply for your selected job.
            Ensure all details are accurate to enhance your chances.
          </p>
        </div>

        {selectedJob ? (
          <div className="row justify-content-center mb-5">
            <div className="col-md-8">
              <div className="card shadow-lg p-4 bg-white rounded-3">
                <h5 className="fw-bold text-dark">
                  {selectedJob.position_title}
                </h5>
                <p className="text-muted mb-1">
                  <strong>Company:</strong> {selectedJob.company_name}
                </p>
                <p className="text-muted mb-1">
                  <strong>Location:</strong> {selectedJob.job_location}
                </p>
                <p className="text-muted mb-1">
                  <strong>Employment Type:</strong>{" "}
                  {selectedJob.employment_type}
                </p>
                <p className="text-muted">
                  <strong>Job ID:</strong> {selectedJob.jobId} |{" "}
                  <strong>Posted:</strong>{" "}
                  {new Date(selectedJob.posted_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-danger mb-4">
            No job selected. Please choose a job before applying.
          </p>
        )}

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="form-label fw-semibold">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="resume" className="form-label fw-semibold">
                  Resume Link <span className="text-danger">*</span>
                </label>
                <input
                  type="url"
                  id="resume"
                  name="resume"
                  className="form-control"
                  placeholder="Enter your resume URL"
                  value={formData.resume}
                  onChange={handleChange}
                  required
                />
                <div className="form-text text-muted mt-1">
                  Please provide a link to your resume hosted on a cloud
                  platform (e.g., Google Drive, Dropbox).
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-3 fw-semibold text-white"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
