import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/login/loginSlice';
import doctorSlice from '../features/doctor/doctorSlice';

export const store = configureStore({
    reducer: {
        login: loginSlice,
        doctor: doctorSlice,
    },
});
