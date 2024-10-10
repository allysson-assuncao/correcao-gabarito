import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerSchema} from '@/utils/authValidation';
import {useMutation} from 'react-query';
import {register as registerService} from '../../services/authService';
import {useDispatch} from "react-redux";
import {signup} from '@/store/slices/authSlice';
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Icons} from "@/public/icons";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    role: string;
}

const RegisterForm = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const handleRoleChange = (value: string) => {
        setValue('role', value);
    };

    const mutation = useMutation(registerService, {
        onSuccess: (data) => {
            console.log(data);
            dispatch(signup({username: data.username, token: data.token, role: data.role}));
            router.push('/home');
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="flex h-full justify-center items-baseline mt-10">
            <Card className={"w-1/2"}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Cadastro</CardTitle>
                    <CardDescription>
                        Preencha todas as informações
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Nome de usuário</Label>
                            <Input type="text" {...register('username')}/>
                            {errors.username && <span className={"span-error"}>{errors.username.message}</span>}

                            <Label htmlFor="email">Email</Label>
                            <Input type="email" {...register('email')} placeholder="exemplo@gmail.com"/>
                            {errors.email && <span className={"span-error"}>{errors.email.message}</span>}

                            <Label htmlFor="password">Senha</Label>
                            <Input type="password" {...register('password')}/>
                            {errors.password && <span className={"span-error"}>{errors.password.message}</span>}

                            <Label htmlFor="role">Cargo</Label>
                            <Select onValueChange={handleRoleChange}>
                                <SelectTrigger className="w-[180px]" {...register('role')}>
                                    <SelectValue placeholder="Você é: " />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Você é: </SelectLabel>
                                        <SelectItem value="ALUNO">Aluno</SelectItem>
                                        <SelectItem value="PROFESSOR">Professor</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.role && <span className={"span-error"}>{errors.role.message}</span>}

                            <Button className="w-full justify-center" type="submit">Cadastrar</Button>
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
                <CardFooter>
                    {/* Link to register page */}
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterForm;
