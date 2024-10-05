import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { themeSlice } from './slices/themeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        theme: themeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
