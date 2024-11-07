import { createSlice } from "@reduxjs/toolkit"

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}
const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {},
})

export default counterSlice.reducer
