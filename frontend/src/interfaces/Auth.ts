export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'PROFESSOR' | 'ALUNO';
}

export interface AuthResponse {
    name: string;
    token: string;
}

export interface AuthState {
    user: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}