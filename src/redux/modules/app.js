import { createSlice } from '@reduxjs/toolkit';

// default state for this slice state
const initialState = {
    value: 0
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        increment: (state, { payload }) => {
            state.value += payload;
        },
        decrement: (state, action) => {
            state.value = state.value - action.payload;
        },
    }
});

const { actions, reducer } = appSlice;

// action generators with types in it
export const { increment, decrement } = actions;
// reducers for this slice state
export default reducer;
