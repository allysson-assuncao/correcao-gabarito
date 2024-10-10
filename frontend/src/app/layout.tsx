"use client";
import "./globals.css";
import {Provider} from "react-redux";
import store from "../store";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@/components/ui/theme-provider";
import {Navbar} from "@/components/navbar/Navbar";
import {ToastProvider} from "@/components/ui/toast";
import React from "react";

const queryClient = new QueryClient();

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt-br">
        <body className={"h-screen flex flex-col"}>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    themes={['light-green', 'dark-green', 'light-blue', 'dark-blue', 'light-purple', 'dark-purple', 'light-red', 'dark-red', 'light-gray', 'dark-gray', 'light-orange', 'dark-orange', 'light-yellow', 'dark-yellow']}
                    disableTransitionOnChange
                >
                    <div className={"h-[10vh]"}>
                        <Navbar/>
                    </div>
                    <div className={"flex-grow h-[85vh]"}>
                        {children}
                    </div>
                    <ToastProvider/>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
        </body>
        </html>
    );
}
