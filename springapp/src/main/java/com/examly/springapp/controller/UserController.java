package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.config.JwtUtil;
import com.examly.springapp.model.UserEntity;
import com.examly.springapp.service.UserService;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    UserService ser;

    @PostMapping("/reg")
    public String register(@RequestBody UserEntity ent) {
        ser.insert(ent);
        return "User registration successful ✅";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        UserEntity user = ser.authenticate(email, password);

        if (user != null) {
            String token = JwtUtil.generateToken(user.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("message", "Login successful ✅");

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid credentials ❌");
        }
    }
}
