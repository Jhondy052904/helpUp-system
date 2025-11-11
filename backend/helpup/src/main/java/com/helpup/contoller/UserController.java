package com.helpup.contoller;

import com.helpup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.helpup.entity.User;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        userRepository.save(user); // save to MySQL
        return "User registered successfully!";
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
