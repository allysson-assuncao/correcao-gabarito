import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {RegisterRequest} from "@/interfaces/Auth";
import {registerUser} from "@/redux/slices/auth";
import RegisterForm from "@/sections/form/RegisterForm";
import {AppDispatch, RootState} from "@/redux/store";

const RegisterPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);

    const handleRegister = (data: RegisterRequest) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [token, router]);

    return <RegisterForm onSubmit={handleRegister} />;
};

export default RegisterPage;
