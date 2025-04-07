package org.firstproject.jobtracker.repository;

import org.firstproject.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepo extends JpaRepository<JobApplication,Long> {
    List<JobApplication> findByUserId(Long id);
    JobApplication findByJobId(Long id);
    JobApplication findByUserIdAndJobId(Long userId, Long jobId);
}
