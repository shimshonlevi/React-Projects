import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import candidanteReducer from "./features/candidante/candidanteSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        candidates: candidanteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;