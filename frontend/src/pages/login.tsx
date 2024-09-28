import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {LoginRequest} from "@/interfaces/Auth";
import {loginUser} from "@/redux/slices/auth";
import LoginForm from "@/sections/form/LoginForm";
import {AppDispatch, RootState} from "@/redux/store";

const LoginPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);

    const handleLogin = (data: LoginRequest) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [token, router]);

    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
