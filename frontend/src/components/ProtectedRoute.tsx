import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    requiredRole?: 'admin' | 'professor' | 'aluno' | 'guest';
}

const ProtectedRoute = (WrappedComponent: React.ComponentType, options?: ProtectedRouteProps) => {
    const AuthComponent = (props: any) => {
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
        const userRole = useSelector((state: RootState) => state.auth.userRole);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (options?.requiredRole && userRole !== options.requiredRole) {
                router.push('/unauthorized');
            }
        }, [isAuthenticated, userRole, router, options]);

        if (!isAuthenticated || (options?.requiredRole && userRole !== options.requiredRole)) {
            return null; // Replace with a loading component
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default ProtectedRoute;

