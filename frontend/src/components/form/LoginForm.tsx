import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import {loginUser} from "@/api/auth";
import {loginSuccess} from "@/store/slices/authSlice";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const dispatch = useDispatch();
    const router = useRouter();

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            dispatch(loginSuccess({ token: data.token, username: data.name }));
            router.push('/dashboard'); // Redireciona após o login
        },
        onError: () => {
            alert('Erro ao logar');
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        mutation.mutate({ email: data.email, password: data.password });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="Email" {...register('email')} required />
            <input type="password" placeholder="Senha" {...register('password')} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
