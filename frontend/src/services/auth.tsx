import axios from 'axios';
import {AuthResponse, LoginRequest, RegisterRequest} from "@/interfaces/Auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(`${API_URL}/api/auth/login`, credentials);
    return data;
};

export const register = async (userDetails: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(`${API_URL}/api/auth/register`, userDetails);
    return data;
};

export const verifyToken = async (token: string): Promise<string> => {
    const { data } = await axios.get(`${API_URL}/api/auth/test`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
