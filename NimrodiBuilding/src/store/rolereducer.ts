
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const optionalroles = ["Unknown Personnel" , "Guest" , "Student" , "Developer" , "Executive Personnel"]
interface RoleState {
    currentRole: string;
}

const initialState: RoleState = {
    currentRole: 'guest',
};


const roleSlice = createSlice({

    name: 'role',
    initialState,
    reducers: {

        setRole: (state, action: PayloadAction<number>) => {
            state.currentRole = optionalroles[action.payload];
         
        },
    },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
