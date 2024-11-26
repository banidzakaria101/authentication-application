package com.example.authentication_application.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterUserDto {

    private String email;
    private String password;
    private String userName;
}
