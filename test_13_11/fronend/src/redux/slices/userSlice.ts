import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { objectID } from "../../../../bakend/src/models/userModel";
import { IDF, IExploation, IRegister, Terorists } from "../../types/Ftype";
import { ILaunched, IMissileResource } from "../../../../bakend/src/types/types";

export interface UserType {
    _id?: objectID;
    username: string;
    password: string;
    organization: Terorists | "IDF";
    location: IDF | null;
    resources: IMissileResource[];
    launchHistory: ILaunched[];
}

interface UserStateType {
    user: UserType | null;
    token: string | null;
    room: string | null;
    error: boolean;
    errorMessage: string | null;
    isLoading: boolean;
}

const BASE_URL = "http://localhost:3001/api";

// Thunks
export const registerUser = createAsyncThunk("/registerUser", async (data: IRegister) => {
    console.log("data: ", JSON.stringify(data, null, 2)); // מודפס בצורה קריאה
    
    const body = data.location.length > 0 ? data : { username: data.username, password: data.password, organization: data.organization };
    const response = await axios.post(`${BASE_URL}/auth/register`, body);
    console.log("response of register: ", JSON.stringify(response.data, null, 2)); // מודפס בצורה קריאה
    return response.data;
});

export const loginUser = createAsyncThunk("user/loginUser", async (data: { username: string; password: string }) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    localStorage.setItem("userToken", JSON.stringify(response.data.token));
    console.log("token:"+response.data.token);
    
    console.log("response of login: " + response.data);
    return response.data;
});

export const launchMissile = createAsyncThunk("user/launchMissile", async (data: { warriorId: string; missileId: string }) => {
    const response = await axios.post(`${BASE_URL}/launchMissile`, data);
    console.log("response of launch missile: " + response.data);
    return response.data;
});

export const getUser = createAsyncThunk("user/getUser", async (data: string) => {
    const token = JSON.parse(localStorage.getItem("userToken")!);
    const response = await axios.get(`${BASE_URL}/getUser/${data}`, { headers: { Authorization: `Bearer ${token}` } });
    console.log("response of get user: " + response.data);
    return response.data;
});

export const exploationOfMissile = createAsyncThunk("user/exploationOfMissile", async (data: IExploation) => {
    const token = JSON.parse(localStorage.getItem("userToken")!);
    const response = await axios.put(
        `${BASE_URL}/user/${data.warriorId}/exploaded`,
        { status: data.status, attacker: data.attacker },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("response of exploation: " + response.data);
    return response.data;
});

// Initial state
const initialState: UserStateType = {
    user: null,
    token: null,
    room: null,
    error: false,
    errorMessage: null,
    isLoading: false,
};

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.error.message as string;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.errorMessage = null;
                state.user = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.error.message as string;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.errorMessage = null;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.error.message as string;
            });
    },
});

export default userSlice.reducer;
