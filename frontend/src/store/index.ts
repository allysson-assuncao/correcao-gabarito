import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
