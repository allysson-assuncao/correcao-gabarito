import { ReactNode } from "react";

export interface ProtectedRouteProps {
    children: ReactNode;
    roles?: Array<'ADMIN' | 'PROFESSOR' | 'ALUNO'>;
};