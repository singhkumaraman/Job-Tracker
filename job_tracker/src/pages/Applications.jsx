import React, { useContext } from "react";
import Jobcard from "../components/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { JobContext } from "../store/JobContext";

const Applications = () => {
  const { appliedJobs, allJobs } = useContext(JobContext);
  const applications = appliedJobs
    .map((appliedJob) => {
      const matchedJob = allJobs.find((job) => job.id === appliedJob.jobId);
      if (matchedJob) {
        const date = new Date(appliedJob.applicationDate);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return {
          ...appliedJob,
          ...matchedJob,
          jobDetails: matchedJob,
          formattedDate,
        };
      }
      return null;
    })
    .filter((app) => app !== null);
  console.log(applications);
  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Job Applications</h2>
      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        applications.map((app, index) => (
          <Jobcard
            key={index}
            status={app.status}
            jobTitle={app.jobDetails.position_title}
            company={app.jobDetails.company_name}
            jobId={app.id}
            appliedDate={app.formattedDate}
            location={app.jobDetails.job_location}
          />
        ))
      )}
    </div>
  );
};

export default Applications;
