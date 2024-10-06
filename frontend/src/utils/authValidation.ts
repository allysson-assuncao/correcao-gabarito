import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(3, { message: "Password must be at least 3 characters" }),
});

export const registerSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(3, { message: "Password must be at least 3 characters" }),
    role: z.enum(["ALUNO", "PROFESSOR", "ADMIN"], { message: "Invalid role" }),
});
