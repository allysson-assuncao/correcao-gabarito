"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import {Provider} from "react-redux";
import store from "../store";
import {QueryClient, QueryClientProvider} from "react-query";

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
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Navbar/>
                {children}
            </QueryClientProvider>
        </Provider>
        </body>
        </html>
    );
}
