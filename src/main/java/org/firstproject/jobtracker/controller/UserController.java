package org.firstproject.jobtracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.firstproject.jobtracker.model.User;
import org.firstproject.jobtracker.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(users);
    }
    @GetMapping("id/{myId}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long myId) {
       return ResponseEntity.ok(userService.getUserById(myId));
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
