package org.firstproject.jobtracker.service;


import org.firstproject.jobtracker.model.Users;
import org.firstproject.jobtracker.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    public static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public JwtService jwtService;
    public UserService(UserRepository userRepo, AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.authenticationManager = authenticationManager;
    }

    public Users register(Users user) {
        Users existingUser = userRepo.findByEmail(user.getEmail());
        if(existingUser != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
           return  userRepo.save(user);
        }
        return null;
    }
    public String verify(Users user) {
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        if(authentication.isAuthenticated()){
            return "Bearer " + JwtService.generateToken(user.getEmail());
        }
        return "invalid request token";
    }


}
