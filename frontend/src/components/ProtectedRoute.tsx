import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import {RootState} from "@/store";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const { isAuthenticated, role: userRole } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || (role && userRole !== role)) {
            router.push('/login');
        }
    }, [isAuthenticated, role, userRole, router]);

    if (!isAuthenticated || (role && userRole !== role)) {
        return null; // Add loading component
    }

    return <>{children}</>;
};

export default ProtectedRoute;
