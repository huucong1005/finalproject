import {combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'

import userReducer from "./slice/userSlice";
import cateReducer from "./slice/categorySlice"
import testReducer from "./slice/testSlice"


export const store = configureStore({
  reducer:  { user:   userReducer,
              cate:   cateReducer,
              test:   testReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch