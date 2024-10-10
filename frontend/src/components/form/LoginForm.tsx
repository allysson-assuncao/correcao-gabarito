import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '@/utils/authValidation';
import {useMutation} from 'react-query';
import {login as loginService} from '../../services/authService';
import {useDispatch} from 'react-redux';
import {login} from '@/store/slices/authSlice';
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Icons} from "@/public/icons";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";

interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm = () => {

    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation(loginService, {
        onSuccess: (data) => {
            dispatch(login({ username: data.username, token: data.token, role: data.role }));

            toast({
                title: 'Login realizado com sucesso!',
                description: `Bem-vindo, ${data.username}!`,
                variant: 'default',
            });
        },
        onError: (error: unknown) => {
            console.log("Tentei");
            if (error instanceof AxiosError) {
                toast({
                    title: 'Erro ao fazer login',
                    description: error.response?.data?.message || 'Ocorreu um erro inesperado.',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Erro ao fazer login',
                    description: 'Ocorreu um erro inesperado.',
                    variant: 'destructive',
                });
            }
        },
    });

    const onSubmit = (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex h-full justify-center items-baseline mt-10">
            <Card className={"w-1/2"}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Informe o email e a senha
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" {...register('email')} placeholder="exemplo@gmail.com"/>
                            {errors.email && <span className={"span-error"}>{errors.email.message}</span>}

                            <Label htmlFor="password">Senha</Label>
                            <Input type="password" {...register('password')}/>
                            {errors.password && <span className={"span-error"}>{errors.password.message}</span>}

                            <Button className="w-full justify-center" type="submit">Login</Button>
                        </div>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Ou faça login com
                        </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Icons.gitHub className="mr-2 h-4 w-4"/>
                            Github
                        </Button>
                        <Button variant="outline">
                            <Icons.google className="mr-2 h-4 w-4"/>
                            Google
                        </Button>
                    </div>

                </CardContent>
                <CardFooter className={"justify-center"}>
                    <Link
                        href="/register"
                        className={"text-sm font-medium transition-colors hover:text-primary"}
                    >
                        Crie uma conta
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginForm;
