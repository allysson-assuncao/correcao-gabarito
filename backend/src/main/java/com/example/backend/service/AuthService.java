package com.example.backend.service;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.exceptions.EmailAlreadyExistsException;
import com.example.backend.exceptions.InvalidCredentialsException;
import com.example.backend.exceptions.UserNotFoundException;
import com.example.backend.infra.security.TokenService;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<AuthResponseDTO> register(RegisterRequestDTO registerRequestDTO) {
        Optional<User> user = this.userRepository.findByEmail(registerRequestDTO.email());

        if (user.isPresent()) {
            throw new EmailAlreadyExistsException(registerRequestDTO.email());
        }

        User newUser = User.builder()
                .email(registerRequestDTO.email())
                .username(registerRequestDTO.username())
                .password(passwordEncoder.encode(registerRequestDTO.password()))
                .role(registerRequestDTO.role())
                .build();
        this.userRepository.save(newUser);

        String token = this.tokenService.generateToken(newUser);
        return Optional.of(new AuthResponseDTO(newUser.getUsername(), token, newUser.getRole()));
    }

    public Optional<AuthResponseDTO> login(LoginRequestDTO loginRequestDTO) {
        User user = this.userRepository.findByEmail(loginRequestDTO.email()).orElseThrow(() -> new UserNotFoundException("User with email " + loginRequestDTO.email() + " not found"));
        if(this.passwordEncoder.matches(loginRequestDTO.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return Optional.of(new AuthResponseDTO(user.getUsername(), token, user.getRole()));
        }
        throw new InvalidCredentialsException("Invalid credentials");
        /*return Optional.empty();*/
    }

}
