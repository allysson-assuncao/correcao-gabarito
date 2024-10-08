"use client";
import localFont from "next/font/local";
import "./globals.css";
import {Provider} from "react-redux";
import store from "../store";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@/components/ui/theme-provider";
import {Navbar} from "@/components/Navbar/Navbar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const queryClient = new QueryClient();

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt-br">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    themes={['light-green', 'dark-green', 'light-purple', 'dark-purple']}
                    disableTransitionOnChange
                >
                    <div>
                        <Navbar/>
                    </div>
                    <div className={"h-full w-full"}>
                        {children}
                    </div>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
        </body>
        </html>
    );
}
