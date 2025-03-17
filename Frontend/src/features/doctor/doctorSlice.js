import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentDoctor: JSON.parse(localStorage.getItem("doctor")) || null,
};
console.log("initialState", initialState.currentDoctor);

export const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        loadDoctor: (state, action) => {
            state.currentDoctor = action.payload;
            localStorage.setItem("doctor", JSON.stringify(action.payload));
        },
        clearDoctor: (state) => {
            state.currentDoctor = null;
            localStorage.removeItem("doctor");
        },
    },
});

export const { loadDoctor, clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;