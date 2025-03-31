package org.firstproject.jobtracker.repository;

import org.firstproject.jobtracker.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<Users,Long> {
    Users findByEmail(String email);
}
