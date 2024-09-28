import { ThemeContextProvider } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeContextProvider>
            <Sidebar />
            <Component {...pageProps} />
        </ThemeContextProvider>
    );
}

export default MyApp;
