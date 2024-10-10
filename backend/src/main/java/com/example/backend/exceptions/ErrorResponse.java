package com.example.backend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private String errorCode;
    private LocalDateTime timestamp;

}

