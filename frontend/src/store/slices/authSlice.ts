import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    userRole: 'admin' | 'professor' | 'aluno' | 'guest';
}

const initialState: AuthState = {
    isAuthenticated: false,
    userRole: 'guest',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ role: 'admin' | 'professor' | 'aluno' | 'guest' }>) {
            state.isAuthenticated = true;
            state.userRole = action.payload.role;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userRole = 'guest';
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
