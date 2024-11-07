import {configureStore} from "@reduxjs/toolkit";
import todosReducer from './features/todos/todosSlice';
import counterReducer from './features/counter/counterSlice';

export const store =  configureStore({
    reducer: {
        todos: todosReducer,
        counter: counterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;