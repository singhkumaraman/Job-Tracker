import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { JobContext } from "../store/JobContext";
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase } from "react-icons/fa";

const Jobcard = ({
  status,
  jobTitle,
  company,
  jobId,
  appliedDate,
  withDrawnDate,
  location,
  roleDetailsLink,
}) => {
  const { withdrawJob } = useContext(JobContext);

  return (
    <div className="card shadow-lg mb-4 rounded-3">
      <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start">
        {/* Left Side: Job Title, Company, and Job ID */}
        <div className="flex-grow-1 mb-3 mb-md-0">
          <a
            href={roleDetailsLink}
            className="text-primary fw-semibold text-decoration-none"
          >
            <h5 className="card-title">{jobTitle}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{company}</h6>
          </a>
          <div className="d-flex align-items-center text-muted small">
            <FaBriefcase className="me-1" />
            <span>Job ID: {jobId}</span>
          </div>
          <div className="d-flex align-items-center text-muted small mt-1">
            <FaCalendarAlt className="me-1" />
            <span>
              {status === "withdrawn" ? "Withdrawn on" : "Applied on"}:{" "}
              {status === "withdrawn" ? withDrawnDate : appliedDate}
            </span>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-between align-items-end">
          <div className="d-flex align-items-center text-muted small mt-1">
            <FaMapMarkerAlt className="me-1" />
            <span>{location}</span>
          </div>

          {status !== "withdrawn" && (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => withdrawJob(jobId)}
            >
              Withdraw Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobcard;
