package com.example.backend.model;

import lombok.Getter;

@Getter
public enum UserRole {

    ADMIN("admin"),
    PROFESSOR("professor"),
    ALUNO("aluno");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

}
