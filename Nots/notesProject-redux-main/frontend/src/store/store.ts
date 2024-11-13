import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/notesSlice";
import authReduce from "./features/authSlice";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        auth: authReduce
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;