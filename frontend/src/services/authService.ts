import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
});

export const login = async ({ email, password }: { email: string, password: string }) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const register = async (data: { username: string, email: string, password: string, role: string }) => {
    const response = await api.post('/register', data);
    return response.data;
};
