package com.example.springboot.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class RegisterRequest {
    @NotNull @Email
    private String username;
    @NotNull @NotEmpty
    private String password;
    @NotNull @NotEmpty
    private String passwordConfirm;
}
