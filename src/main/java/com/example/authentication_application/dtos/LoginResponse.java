package com.example.authentication_application.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {

    private String token;
    private long expiresIn;
    private Long userId;
}
