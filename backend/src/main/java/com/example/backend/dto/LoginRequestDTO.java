package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(
        @Email(message = "Invalid email format")
        @NotBlank(message = "Email is mandatory") String email,
        @NotBlank(message = "Password is mandatory")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-_#@$%^&+=]).{8,}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (-, _, #, @, $, etc.)"
        )
        String password) {
}
