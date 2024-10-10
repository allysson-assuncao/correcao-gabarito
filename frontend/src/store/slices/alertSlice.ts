import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    message: string;
    open: boolean;
    variant: 'default' | 'success' | 'destructive';
}

const initialState: AlertState = {
    message: '',
    open: false,
    variant: 'default',
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ message: string; variant: 'default' | 'success' | 'destructive' }>) => {
            state.message = action.payload.message;
            state.variant = action.payload.variant;
            state.open = true;
        },
        closeAlert: (state) => {
            state.open = false;
            state.message = '';
        },
    },
});

export const { showAlert, closeAlert } = alertSlice.actions;

