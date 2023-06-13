import {createSlice, Dispatch} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    category: [],
}

export const cateSlice = createSlice({
    name: 'cate',
    initialState,
    reducers: {
      saveCate: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.category = action.payload
      }
    }
  })
  
  export const { saveCate} = cateSlice.actions;
  
  export const getCate = () => async (dispatch: Dispatch) => {
        try {
          const response = await axios.get('https://646cf9a37b42c06c3b2c5e0b.mockapi.io/category');///////
          console.log(response.data)
          dispatch(saveCate(response.data));
        } catch (e) {
          console.log(e);
        }
  }
  
  
  export default cateSlice.reducer
  