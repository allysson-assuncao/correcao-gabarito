"use client";
import { useSelector } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import {RootState} from "@/store";
import {useRouter} from "next/navigation";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const { isAuthenticated, role: userRole } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log(isAuthenticated);
            console.log("Unauthenticated!")
            router.push('/login');
        } else if (role && userRole !== role) {
            console.log(userRole + " " + role);
            console.log("Unauthorized!")
            // send back to the last route and show a waring snackbar os smth
        }
    }, [isAuthenticated, role, userRole, router]);

    if (!isAuthenticated || (role && userRole !== role)) {
        return null; // Add loading component
    }

    return <>{children}</>;
};

export default ProtectedRoute;
