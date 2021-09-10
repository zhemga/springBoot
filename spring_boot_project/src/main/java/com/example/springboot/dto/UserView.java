package com.example.springboot.dto;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Data
public class UserView {

    private String id;
    private String username;
    private Collection<GrantedAuthority> roles;

}