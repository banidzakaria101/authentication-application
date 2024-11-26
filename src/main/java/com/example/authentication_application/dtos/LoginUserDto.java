package com.example.authentication_application.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginUserDto {

    private String email;
    private String password;
}
