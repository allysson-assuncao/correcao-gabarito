import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/utils/authValidation';
import { useMutation } from 'react-query';
import { register as registerService } from '../../services/authService';
import {useDispatch} from "react-redux";
import { signup } from '@/store/slices/authSlice';
import {useRouter} from "next/navigation";

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    role: string;
}

const RegisterForm = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation(registerService, {
        onSuccess: (data) => {
            console.log(data);
            dispatch(signup({ username: data.username, token: data.token, role: data.role }));
            router.push('/home');
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('username')} placeholder="Username" />
            {errors.username && <span>{errors.username.message}</span>}

            <input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}

            <input type="password" {...register('password')} placeholder="Password" />
            {errors.password && <span>{errors.password.message}</span>}

            <select {...register('role')}>
                <option value="ALUNO">Aluno</option>
                <option value="PROFESSOR">Professor</option>
                <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <span>{errors.role.message}</span>}

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
