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
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h6 className="fw-bold">{position}</h6>
          <a href="#" className="text-primary text-decoration-none">
            {company}
          </a>
          <p className="text-muted mb-1">
            Job ID: {jobId} | Posted: {formattedPostedDate}
          </p>
          <p className="mb-1">
            <strong>Location: </strong> {location}
          </p>
          <p className="mb-0 text-danger">
            <strong>Deadline: </strong> {formattedDeadline}
          </p>
        </div>
        <div>
          <Link
            className="btn btn-outline-primary btn-sm"
            to="/apply"
            onClick={() => setCurrJobId(jobId)}
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobList;
