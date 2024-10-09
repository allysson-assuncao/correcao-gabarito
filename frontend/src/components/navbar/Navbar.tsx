import Link from 'next/link';
import Image from "next/image";
import {AvatarDropdown} from "@/components/navbar/avatar-dropdown/avatar-dropdown";
import {ThemeToggle} from "@/components/ThemeToggle";

export const Navbar = () => {
    return (
        <nav className={"w-full h-full shadow-md"}>
            <div className={"container mx-auto px-4 py-2 flex justify-around items-center"}>
                {/*<Image alt={'logo'} src={"./././app/logo.png"} width={50} height={50} />*/}
                <div className="hidden md:flex space-x-8">
                    <Link
                        href="/"
                        className={"text-sm font-medium transition-colors hover:text-primary"}
                    >
                        Index
                    </Link>
                    <Link
                        href="/home"
                        className={"text-sm font-medium transition-colors hover:text-primary"}
                    >
                        Página Inicial
                    </Link>
                    <Link
                        href="/register"
                        className={"text-sm font-medium transition-colors hover:text-primary"}
                    >
                        Cadastro
                    </Link>
                    <Link
                        href="/login"
                        className={"text-sm font-medium transition-colors hover:text-primary"}
                    >
                        Login
                    </Link>
                </div>
                <div>
                    <ThemeToggle/>
                </div>
                <div>
                    <AvatarDropdown/>
                </div>
            </div>
        </nav>
    );
};
