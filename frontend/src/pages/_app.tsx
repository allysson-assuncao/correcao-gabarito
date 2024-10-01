import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar/Sidebar';
import { useEffect } from 'react';
import {router} from "next/client";

const queryClient = new QueryClient();

const MyAppContent = ({ Component, pageProps }: AppProps) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const primaryColor = useSelector((state: RootState) => state.theme.primaryColor);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.setProperty('--color-primary', primaryColor);
    }, [theme, primaryColor]);

    return (
        <>
            <Sidebar />
            <div className="ml-64 p-4"> {/* Adjust padding */}
                <Component {...pageProps} />
            </div>
        </>
    );
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MyAppContent Component={Component} pageProps={pageProps} router={router} />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
