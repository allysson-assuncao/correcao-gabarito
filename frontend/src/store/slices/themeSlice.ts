import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    theme: string;
    primaryColor: string;
}

const initialState: ThemeState = {
    theme: 'light',
    primaryColor: '#0000ff',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setPrimaryColor: (state, action: PayloadAction<string>) => {
            state.primaryColor = action.payload;
        },
    },
});

export const { setTheme, setPrimaryColor } = themeSlice.actions;
