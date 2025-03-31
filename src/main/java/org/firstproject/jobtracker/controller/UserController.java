package org.firstproject.jobtracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.firstproject.jobtracker.model.Users;
import org.firstproject.jobtracker.service.UserService;


@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody Users user) {
       Users existingUser= userService.register(user);
       if(existingUser == null) {
           return ResponseEntity.ok("User registered successfully");
       }
       return ResponseEntity.badRequest().body("Username already exists");
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) throws Exception {
        return ResponseEntity.ok(userService.verify(user));
    }
}
