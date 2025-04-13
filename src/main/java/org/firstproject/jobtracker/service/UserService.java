package org.firstproject.jobtracker.service;

import jakarta.persistence.EntityNotFoundException;
import org.firstproject.jobtracker.model.JobApplication;
import org.firstproject.jobtracker.model.Users;
import org.firstproject.jobtracker.repository.JobApplicationRepo;
import org.firstproject.jobtracker.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final JobApplicationRepo jobApplicationRepo;
    public static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public JwtService jwtService;
    public UserService(UserRepository userRepo, AuthenticationManager authenticationManager, JobApplicationRepo jobApplicationRepo) {
        this.userRepo = userRepo;
        this.authenticationManager = authenticationManager;
        this.jobApplicationRepo = jobApplicationRepo;
    }

    public void register(Users user) {
        Users existingUser = userRepo.findByUsername(user.getUsername());
        if(existingUser == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
        }
    }
    public Map<String,String> verify(Users user) {
        Map<String,String> res=new HashMap<>();
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        if(authentication.isAuthenticated()){
            res.put("token",JwtService.generateToken(user.getUsername()));
            return res;
        }
        res.put("token","none");
        return res;
    }
    public List<JobApplication> getMyApplications(String username){
        Users user = userRepo.findByUsername(username);
        return jobApplicationRepo.findByUserId(user.getId());
    }
    public JobApplication applyJob(JobApplication jobApplication) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user=userRepo.findByUsername(username);
        JobApplication newApplication=new JobApplication();
        JobApplication existingApplication=jobApplicationRepo.findByUserIdAndJobId(user.getId(),jobApplication.getJobId());
        if(existingApplication!=null) {
            return newApplication;
        }
        newApplication.setUserId(user.getId());
        newApplication.setJobId(jobApplication.getJobId());
        newApplication.setApplicationDate(new Date());
        newApplication.setStatus("applied");
        newApplication.setPhoneNumber(jobApplication.getPhoneNumber());
        newApplication.setResumePath(jobApplication.getResumePath());
        return  jobApplicationRepo.save(newApplication);
    }
    @Transactional
    public void withdrawJob(Long id) {
        JobApplication jobApplication = jobApplicationRepo.findByJobId(id);
        if (jobApplication != null) {
            jobApplication.setStatus("withdrawn");
            jobApplication.setClosingDate(new Date());
            jobApplicationRepo.save(jobApplication);
        } else {
            throw new EntityNotFoundException("JobApplication not found for job ID: " + id);
        }
    }

}