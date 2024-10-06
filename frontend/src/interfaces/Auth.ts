export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface AuthResponse {
    username: string;
    token: string;
    role: string;
}
