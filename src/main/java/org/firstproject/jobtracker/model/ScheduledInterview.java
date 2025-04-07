import jakarta.persistence.*;
import lombok.Data;
import org.firstproject.jobtracker.model.JobApplication;

import java.util.Date;

@Entity
@Data
public class ScheduledInterview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    private JobApplication application;

    @Column(name = "interview_date", nullable = false)
    private Date interviewDate;

    @Column(name = "interview_mode", length = 50)
    private String mode; // e.g., Zoom, In-person, Phone

    @Column(name = "location")
    private String location;

    @Column(name = "interviewer_name")
    private String interviewerName;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}
