// features/users/usersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { User, RootState } from "../../../types/index";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

interface UserState {
    users: User[];
    state:;
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

// שימוש בטיפוס RootState כדי להבטיח שהסלקטור מקבל את הסטייט הנכון
export const selectAllUsers = (state: RootState): User[] => state.users;

export default usersSlice.reducer;