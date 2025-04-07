package org.firstproject.jobtracker.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "job_application")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "job_id", nullable = false, unique = true)
    private Long jobId;

    @Column(name = "application_date", nullable = false)
    private Date applicationDate;

    @Column(name = "status", length = 50, nullable = false)
    private String status;

    @Column(name = "resume_path")
    private String resumePath;

    @Column(name = "phone_number", length = 20, nullable = false)
    private String phoneNumber;

    @Column(name="closing_date")
    private Date closingDate;


}
