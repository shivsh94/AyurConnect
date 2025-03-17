import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null, 
    };  
    // console.log("initialState",initialState.currentUser);
    
    

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            
        },
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;