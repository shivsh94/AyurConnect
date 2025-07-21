import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentDoctor: JSON.parse(localStorage.getItem("doctors")) || [],
    loading: false,
    error: null
};

export const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        loadDoctor: (state, action) => {
            state.currentDoctor = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem("doctors", JSON.stringify(action.payload));
        },
        clearDoctor: (state) => {
            state.currentDoctor = [];
            state.loading = false;
            state.error = null;
            localStorage.removeItem("doctors");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
});

export const { loadDoctor, clearDoctor, setLoading, setError } = doctorSlice.actions;
export default doctorSlice.reducer;