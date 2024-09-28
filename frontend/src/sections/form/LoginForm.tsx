import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

interface LoginFormInputs {
    email: string;
    password: string;
}

const loginSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().min(6, 'Senha deve ter ao menos 6 caracteres').required('Campo obrigatório'),
});

interface LoginFormProps {
    onSubmit: SubmitHandler<LoginFormInputs>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Entrar
            </Button>
        </Box>
    );
};

export default LoginForm;
