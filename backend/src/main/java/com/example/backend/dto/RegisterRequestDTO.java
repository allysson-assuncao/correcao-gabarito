package com.example.backend.dto;

import com.example.backend.model.UserRole;
import jakarta.validation.constraints.*;

public record RegisterRequestDTO(
        @Size(min = 4, message = "Username must be at least 4 characters long") @NotBlank(message = "Username is mandatory") String username,
        @Email(message = "Invalid email format")
        @NotBlank(message = "Email is mandatory") String email,
        @Size(min = 8, message = "Password must be at least 8 characters long")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-_#@$%^&+=]).{8,}$",
                message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (-, _, #, @, $, etc.)"
        ) String password,
        @NotNull(message = "User role is mandatory") UserRole role) {
}
