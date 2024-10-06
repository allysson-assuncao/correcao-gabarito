export interface AuthState {
    username: string;
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
}
