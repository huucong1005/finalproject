import {createSlice, Dispatch} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    users: [],
    mark: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      saveUsers: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.users = action.payload
      },
      saveUserMark: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.mark = action.payload
      }
    }
  })
  
  export const { saveUsers, saveUserMark } = userSlice.actions;
  
  export const getUsers = () => async (dispatch: Dispatch) => {
        try {
          const response = await axios.get('https://646cf8c57b42c06c3b2c5cbe.mockapi.io/user');
          console.log(response.data)
          dispatch(saveUsers(response.data));
        } catch (e) {
          console.log(e);
        }
  }
  export const getUserMark = () => async (dispatch: Dispatch) => {
    // @ts-ignore
    const userId =JSON.parse(window.localStorage.getItem('account')).userId
        try {
          const response = await axios.get('https://646cf8c57b42c06c3b2c5cbe.mockapi.io/user/'+(userId)+'/mark');
          console.log(response.data)
          dispatch(saveUserMark(response.data));
        } catch (e) {
          console.log(e);
        }
  }
  

  export default userSlice.reducer
  