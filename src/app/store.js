// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });


import { combineReducers, createStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// assume that the counter slice will be combined with other slices
const reducer = combineReducers({
  counter: counterReducer
});

// create the store from the combined reducer
const store = createStore(reducer);

export default store;
