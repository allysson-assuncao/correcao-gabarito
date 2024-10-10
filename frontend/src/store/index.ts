import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import {alertSlice} from "@/store/slices/alertSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        alert: alertSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
