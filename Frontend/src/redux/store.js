import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';

export const store = configureStore({
    reducer: {
        login: loginSlice,
    },
});
