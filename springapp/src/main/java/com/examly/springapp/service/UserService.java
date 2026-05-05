package com.examly.springapp.service;

import com.examly.springapp.model.UserEntity;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    // Register user
    public void insert(UserEntity user) {
        // Encode password before saving
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
    }

    // Authenticate user
    public UserEntity authenticate(String email, String password) {
        UserEntity user = repo.findByEmail(email);
        if (user != null && encoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}
