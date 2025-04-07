package org.firstproject.jobtracker.controller;

import org.firstproject.jobtracker.model.JobApplication;
import org.firstproject.jobtracker.model.Jobs;
import org.firstproject.jobtracker.repository.JobApplicationRepo;
import org.firstproject.jobtracker.repository.JobRepository;
import org.firstproject.jobtracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("job-tracker/job")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    private Jobs jobs;
    private final JobRepository jobRepository;
    private final UserService  userService;
    public JobController(JobRepository jobRepository, JobApplicationRepo jobApplicationRepo, UserService userService) {
        this.jobRepository=jobRepository;
        this.userService = userService;
    }
    @GetMapping("/jobs")
    public ResponseEntity<?> getJobs() {
        List<Jobs> jobs=jobRepository.findAll();
        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/my-applications")
    public ResponseEntity<?> getMyApplications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return ResponseEntity.ok(userService.getMyApplications(username));
    }
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestBody JobApplication jobApplication) {
        JobApplication job=userService.applyJob(jobApplication);
        if(job!=null) {
            return ResponseEntity.ok("thank you for applying");
        }
        return ResponseEntity.ok("something went wrong try again");
    }
    @PutMapping("/withdraw/{id}")
    public ResponseEntity<?> withdraw(@PathVariable Long id) {
        userService.withdrawJob(id);
        return ResponseEntity.ok("Done");
    }
}
