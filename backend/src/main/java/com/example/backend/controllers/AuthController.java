package com.example.backend.controllers;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO){
        Optional<AuthResponseDTO> optionalAuthResponseDTO = this.authService.login(loginRequestDTO);
        return optionalAuthResponseDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
        /*if(optionalAuthResponseDTO.isPresent()){
            return ResponseEntity.ok(optionalAuthResponseDTO.get());
        }
        return ResponseEntity.badRequest().build();*/
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterRequestDTO registerRequestDTO){
        Optional<AuthResponseDTO> optionalAuthResponseDTO = this.authService.register(registerRequestDTO);
        return optionalAuthResponseDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
        /*if(optionalAuthResponseDTO.isPresent()){
            return ResponseEntity.ok(optionalAuthResponseDTO.get());
        }
        return ResponseEntity.badRequest().build();*/
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Successfully authenticated");
    }

}
