package com.example.authentication_application.controllers;

import com.example.authentication_application.dtos.LoginResponse;
import com.example.authentication_application.dtos.LoginUserDto;
import com.example.authentication_application.dtos.RegisterUserDto;
import com.example.authentication_application.entities.User;
import com.example.authentication_application.services.AuthenticationService;
import com.example.authentication_application.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/auth")
public class AuthenticationController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authService;
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> authenticate(@RequestBody RegisterUserDto register) {
        User authenticatedUser = authenticationService.register(register);

        return  ResponseEntity.ok(authenticatedUser);
    }

    @RequestMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto login) {
        try{
            User authenticatedUser = authenticationService.login(login);
            String jwtToken = jwtService.generateToken(authenticatedUser);
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());

            return  ResponseEntity.ok(loginResponse);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while attempting to login");
        }
    }
}
