import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/utils/authValidation';
import { useMutation } from 'react-query';
import { login as loginService } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation(loginService, {
        onSuccess: (data) => {
            console.log(data);
            dispatch(login({ username: data.username, token: data.token, role: data.role }));
        },
    });

    const onSubmit = (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}

            <input type="password" {...register('password')} placeholder="Password" />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
