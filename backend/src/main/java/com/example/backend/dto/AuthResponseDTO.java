package com.example.backend.dto;

import com.example.backend.model.UserRole;

public record AuthResponseDTO(String username, String token, UserRole role) {
}
