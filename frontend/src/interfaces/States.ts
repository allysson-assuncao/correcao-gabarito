export interface AuthState {
    username: string;
    token: string | null;
    role: string;
    isAuthenticated: boolean;
}
