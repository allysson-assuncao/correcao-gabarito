import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    username: string | null;
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    username: null,
    token: null,
    role: null,
    isAuthenticated: false,
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
        },
        logout: (state) => {
            state.username = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
