"use client";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {RootState} from "@/store";
import {useRouter} from "next/navigation";
import {ProtectedRouteProps} from "@/interfaces/Props";

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const { isAuthenticated, role: userRole } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log(isAuthenticated);
            console.log("Unauthenticated!")
            router.push('/login');
        } else if (roles && !roles.includes(userRole as 'ADMIN' | 'PROFESSOR' | 'ALUNO')) {
            console.log(userRole + " " + roles);
            console.log("Unauthorized!")
            // Send back to the last route and show a waring snackbar os smth
        }
    }, [isAuthenticated, roles, userRole, router]);

    if (!isAuthenticated || (roles && !roles.includes(userRole as 'ADMIN' | 'PROFESSOR' | 'ALUNO'))) {
        return null; // Add loading component
    }

    return <>{children}</>;
};

export default ProtectedRoute;
