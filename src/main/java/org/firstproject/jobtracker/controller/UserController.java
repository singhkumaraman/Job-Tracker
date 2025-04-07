package org.firstproject.jobtracker.controller;

import org.firstproject.jobtracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.firstproject.jobtracker.model.Users;
import org.firstproject.jobtracker.service.UserService;

@RestController
@RequestMapping("job-tracker/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }
    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody Users user) {
       Users existingUser= userRepository.findByUsername(user.getUsername());
       if(existingUser == null) {
           userService.register(user);
           return ResponseEntity.ok("User registered successfully");
       }
       return ResponseEntity.badRequest().body("Username already exists");
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) throws Exception {
        return ResponseEntity.ok(userService.verify(user));
    }
}
