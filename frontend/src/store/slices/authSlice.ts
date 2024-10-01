import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    username: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    username: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; username: string }>) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.username = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
