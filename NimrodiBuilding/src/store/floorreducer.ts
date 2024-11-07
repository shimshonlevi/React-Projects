
// floorReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
    floorAccess: [false, false, false, false, false]
};

const floorSlice = createSlice({
    name: 'floors',
    initialState,
    reducers: {
        changeAccess: (state, action: PayloadAction<number>) => {
            const floor = action.payload;
            state.floorAccess[floor] = !state.floorAccess[floor]
        },
    },
});

export const { changeAccess } = floorSlice.actions;
export default floorSlice.reducer;
