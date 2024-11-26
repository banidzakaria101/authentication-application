package com.example.authentication_application.services;

import com.example.authentication_application.dtos.LoginUserDto;
import com.example.authentication_application.dtos.RegisterUserDto;
import com.example.authentication_application.entities.User;
import com.example.authentication_application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterUserDto register) {
        User user = new User();

        user.setUserName(register.getUserName());
        user.setEmail(register.getEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword()));

        return  userRepository.save(user);
    }

    public User login(LoginUserDto login) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getEmail(),
                        login.getPassword()
                )
        );
        return  userRepository.findByEmail(login.getEmail()).orElseThrow();
    }
}
