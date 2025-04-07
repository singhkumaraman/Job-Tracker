package org.firstproject.jobtracker.repository;

import org.firstproject.jobtracker.model.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Jobs,Long> {
}
