import { createSlice } from "@reduxjs/toolkit";

interface AuthStateType{
    auth: boolean;
}

const initialState : AuthStateType = {
        auth: false
};

export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        login: (state) => {
            state.auth = true;
        },
        logout: (state) => {
            state.auth = false;
        },
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;