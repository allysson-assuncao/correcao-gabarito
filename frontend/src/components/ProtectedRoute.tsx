import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import {selectAuthState} from "@/redux/slices/auth";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const { token } = useSelector(selectAuthState);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    return token ? <>{children}</> : null;
};

/*interface ProtectedRouteProps {
    children: ReactNode;
    string: role;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role  }) => {
    const router = useRouter();
    const { token, userRole } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!token || userRole !== "ADMIN"replace with actual role) {
            //show a snackbar with a warning about the role and the option to login
        }else if (!token) {
            router.push('/login');
        }
    }, [token, userRole, router]);

    return token && userRole === "ADMIN" ? <>{children}</> : null;
};*/

export default ProtectedRoute;
