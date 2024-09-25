package com.example.backend.dto;

import com.example.backend.model.UserRole;

public record RegisterRequestDTO(String email, String username, String password, UserRole role) {
}
