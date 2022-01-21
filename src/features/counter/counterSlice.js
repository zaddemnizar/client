import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   value: 0,
//   status: 'idle',
// };

// basic example slice copied from the docs
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

// destructure actions and reducer from the slice (or you can access as counterSlice.actions)
const { actions, reducer } = counterSlice;

// export individual action creator functions
export const { increment, decrement } = actions;

// often the reducer is a default export, but that doesn't matter
export default reducer;


// export const { increment, decrement } = counterSlice.actions;

// export const selectCount = (state) => state.counter.value;

// export default counterSlice.reducer;




