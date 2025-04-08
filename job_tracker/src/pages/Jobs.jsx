import React, { useContext } from "react";
import JobList from "../components/JobList";
import "bootstrap/dist/css/bootstrap.min.css";
import { JobContext } from "../store/JobContext";

const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { allJobs } = jobContext;
  const { appliedJobs } = jobContext;
  // console.log(allJobs);
  const jobToDisplay = allJobs.filter((job) => {
    return !appliedJobs.find((appliedJob) => appliedJob.jobId === job.id);
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Job Openings</h2>
      {jobToDisplay.map((job, index) => (
        <JobList
          key={index}
          position={job.position_title}
          company={job.company_name}
          jobId={job.id}
          location={job.job_location}
          timestamp={job.posted_at}
          deadline={job.application_deadline}
        />
      ))}
    </div>
  );
};

export default Jobs;
