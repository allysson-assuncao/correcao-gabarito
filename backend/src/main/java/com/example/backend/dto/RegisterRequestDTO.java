package com.example.backend.dto;

import com.example.backend.model.UserRole;

public record RegisterRequestDTO(String username, String email, String password, UserRole role) {
}
