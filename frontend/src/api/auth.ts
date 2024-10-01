import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const registerUser = async (username: string, email: string, password: string, role: string) => {
    const response = await api.post('/register', { username, email, password, role });
    return response.data;
};
