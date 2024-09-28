import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {AuthResponse, AuthState, LoginRequest, RegisterRequest} from "@/interfaces/Auth";
import {login, register} from "@/services/auth";

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
    'auth/login',
    async (credentials: LoginRequest) => {
        const response = await login(credentials);
        return response;
    }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/register',
    async (userDetails: RegisterRequest) => {
        const response = await register(userDetails);
        return response;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.name;
                state.token = action.payload.token;
                state.loading = false;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Erro no login';
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.name;
                state.token = action.payload.token;
                state.loading = false;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message || 'Erro no registro';
                state.loading = false;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthState = (state: RootState): AuthState => state.auth;
