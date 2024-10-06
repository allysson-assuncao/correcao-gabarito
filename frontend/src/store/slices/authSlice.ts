import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    username: string;
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
}

const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem('token') : null;
const roleFromStorage = typeof window !== "undefined" ? localStorage.getItem('role') : null;

const initialState: AuthState = {
    username: '',
    token: tokenFromStorage,
    role: roleFromStorage,
    isAuthenticated: !!tokenFromStorage,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; token: string; role: string }>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            console.log(state.isAuthenticated)
            console.log(state.role)

            // Updating localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
        },
        signup(state, action: PayloadAction<{ username: string, token: string, role: string }>) {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;

            // Updating localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
        },
        logout: (state) => {
            state.username = '';
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;

            // Removing from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
    },
});

export const { login, signup, logout } = authSlice.actions;
