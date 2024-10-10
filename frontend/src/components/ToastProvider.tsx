import { Toast, useToast } from "@/components/ui/toast"; // ajuste o caminho
import { useState, createContext, useContext } from "react";

interface ToastContextProps {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showToast = (msg: string) => {
        setMessage(msg);
        setOpen(true);
        setTimeout(() => setOpen(false), 3000); // fecha após 3 segundos
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
    {children}
    <Toast open={open} onOpenChange={setOpen}>
        {message}
        </Toast>
        </ToastContext.Provider>
);
};
