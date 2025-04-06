package com.makisanTech.saltaFan.controller;

import com.makisanTech.saltaFan.dto.LoginDTO;
import com.makisanTech.saltaFan.dto.request.RegistrationDTO;
import com.makisanTech.saltaFan.dto.response.LoginResponseDTO;
import com.makisanTech.saltaFan.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO user) {
        try {
            LoginResponseDTO response = authService.login(user);
            return ResponseEntity.ok(Map.of("id", response.id(), "token", response.token(), "name", response.name(), "role", response.role()));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationDTO request) {
        try {
            LoginResponseDTO response = authService.register(request);
            return ResponseEntity.ok(Map.of("id", response.id(),"token", response.token(), "name", response.name()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
