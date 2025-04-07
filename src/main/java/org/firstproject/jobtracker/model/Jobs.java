package org.firstproject.jobtracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name="jobs")
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="job_id")
    private Long id;

    @Column(name = "company_name", nullable = false, length = 255)
    private String company_name;

    @Column(name = "position_title", nullable = false, length = 255)
    private String position_title;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String job_description;

    @Column(name = "application_deadline")
    private Date application_deadline;

    @Column(name = "job_location", length = 255)
    private String job_location;

    @Column(name = "posted_at")
    private Date posted_at;

    @Column(name = "employment_type", length = 100)
    private String employment_type;
}
