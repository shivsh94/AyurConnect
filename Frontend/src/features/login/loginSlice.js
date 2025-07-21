import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUser: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        }
    }
});

export const { login, logout, setLoading, setError, clearError, updateUser } = loginSlice.actions;
export default loginSlice.reducer;