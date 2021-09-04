package com.example.springboot.controllers;

import com.example.springboot.configure.security.JwtTokenUtil;
import com.example.springboot.dto.AuthRequest;
import com.example.springboot.dto.RegisterRequest;
import com.example.springboot.dto.UserView;
import com.example.springboot.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Tag(name = "Authentication")
@RestController
@RequestMapping(path = "api/public")
@RequiredArgsConstructor
public class AuthApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("login")
    public ResponseEntity<UserView> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()));

            User user = (User) authenticate.getPrincipal();
            com.example.springboot.entities.User dbUser = userRepository
                    .findByUsername(user.getUsername());
            UserView userView = new UserView();
            userView.setUsername(user.getUsername());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateAccessToken(dbUser))
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("register")
    public ResponseEntity<UserView> register(@RequestBody @Valid RegisterRequest request) {
        try {
            if (userRepository.findByUsername(request.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            if (!request.getPassword().equals(request.getPasswordConfirm())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            com.example.springboot.entities.User user = new com.example.springboot.entities.User(request.getUsername(),
                    bCryptPasswordEncoder.encode(request.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok().build();
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}