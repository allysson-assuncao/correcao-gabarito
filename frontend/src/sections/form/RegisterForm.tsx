import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box } from '@mui/material';

interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'PROFESSOR' | 'ALUNO';
}

const registerSchema = yup.object().shape({
    username: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().min(6, 'Senha deve ter ao menos 6 caracteres').required('Campo obrigatório'),
    role: yup.string().oneOf(['ADMIN', 'PROFESSOR', 'ALUNO'], 'Role inválido').required('Campo obrigatório'),
});

interface RegisterFormProps {
    onSubmit: SubmitHandler<RegisterFormInputs>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: yupResolver(registerSchema),
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
            />
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
            <TextField
                label="Role"
                fullWidth
                margin="normal"
                {...register('role')}
                error={!!errors.role}
                helperText={errors.role?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrar
            </Button>
        </Box>
    );
};

export default RegisterForm;
