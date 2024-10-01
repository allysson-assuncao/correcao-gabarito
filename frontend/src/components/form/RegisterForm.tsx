import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import {registerUser} from "@/api/auth";

interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
    role: string;
}

const RegisterForm: React.FC = () => {
    const { register, handleSubmit } = useForm<RegisterFormInputs>();
    const router = useRouter();

    const mutation = useMutation(registerUser, {
        onSuccess: () => {
            router.push('/login');
        },
        onError: () => {
            alert('Erro ao registrar');
        },
    });

    const onSubmit = (data: RegisterFormInputs) => {
        mutation.mutate({
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Username" {...register('username')} required />
            <input type="email" placeholder="Email" {...register('email')} required />
            <input type="password" placeholder="Senha" {...register('password')} required />
            <select {...register('role')} required>
                <option value="ALUNO">Aluno</option>
                <option value="PROFESSOR">Professor</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
