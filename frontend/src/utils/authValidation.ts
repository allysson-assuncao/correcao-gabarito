import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["USER", "ADMIN"], { message: "Invalid role" }),
});
