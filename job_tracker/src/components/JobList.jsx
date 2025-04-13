import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { JobContext } from "../store/JobContext";

const JobList = ({
  jobId,
  company,
  position,
  location,
  timestamp,
  deadline,
}) => {
  const formattedPostedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No Deadline";

  const { setCurrJobId } = useContext(JobContext);

  return (
    <div className="card shadow-lg mb-4 border-light rounded-3">
      <div className="card-body d-flex justify-content-between align-items-start p-4">
        <div>
          <h5 className="fw-bold text-dark">{position}</h5>
          <a href="#" className="text-primary text-decoration-none fw-semibold">
            {company}
          </a>
          <p className="text-muted mb-2">
            <small>
              Job ID: {jobId} | Posted: {formattedPostedDate}
            </small>
          </p>
          <p className="mb-1">
            <strong>Location: </strong> {location}
          </p>
          <p className="mb-0 text-danger">
            <strong>Deadline: </strong> {formattedDeadline}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <Link
            className="btn btn-primary btn-sm fw-semibold text-white"
            to="/apply"
            onClick={() => setCurrJobId(jobId)}
            style={{ padding: "8px 16px" }}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobList;
