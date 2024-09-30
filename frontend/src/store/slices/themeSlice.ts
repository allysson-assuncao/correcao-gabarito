import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    theme: 'light' | 'dark';
    primaryColor: string;
}

const initialState: ThemeState = {
    theme: 'light',
    primaryColor: '#1D4ED8', // Default primary color
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<'light' | 'dark'>) {
            state.theme = action.payload;
        },
        setPrimaryColor(state, action: PayloadAction<string>) {
            state.primaryColor = action.payload;
        },
    },
});

export const { setTheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;
