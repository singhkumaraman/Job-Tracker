import React, { useContext, useState } from "react";
import JobList from "../components/JobList";
import "bootstrap/dist/css/bootstrap.min.css";
import { JobContext } from "../store/JobContext";

const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { allJobs, appliedJobs } = jobContext;

  const jobToDisplay = allJobs.filter(
    (job) => !appliedJobs.find((appliedJob) => appliedJob.jobId === job.id)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobToDisplay.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobToDisplay.length / jobsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Job Openings</h2>

      {currentJobs.map((job, index) => (
        <JobList
          key={job.id || index}
          position={job.position_title}
          company={job.company_name}
          jobId={job.id}
          location={job.job_location}
          timestamp={job.posted_at}
          deadline={job.application_deadline}
        />
      ))}

      <nav>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Jobs;
