// context/ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextProps {
    toggleTheme: (theme: string) => void;
    toggleColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => useContext(ThemeContext);

// needs some change
export const ThemeContextProvider: React.FC = ({ children }) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const [primaryColor, setPrimaryColor] = useState('#1976d2');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedColor = localStorage.getItem('primaryColor') || '#1976d2';
        setThemeMode(savedTheme as 'light' | 'dark');
        setPrimaryColor(savedColor);
    }, []);

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: primaryColor,
            },
        },
    });

    const toggleTheme = (newTheme: string) => {
        setThemeMode(newTheme as 'light' | 'dark');
        localStorage.setItem('theme', newTheme);
    };

    const toggleColor = (newColor: string) => {
        setPrimaryColor(newColor);
        localStorage.setItem('primaryColor', newColor);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, toggleColor }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
