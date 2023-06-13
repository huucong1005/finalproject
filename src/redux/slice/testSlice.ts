import {createSlice, Dispatch} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    test: [],
    testdetail: [],
    answer: [],
    questiondetail:{}
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
      saveTest: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.test = action.payload
      },
      saveTestDetail: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.testdetail = action.payload
      },
      getAnswers: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.answer = action.payload
      },
      saveQuestionDetail: (state, action: PayloadAction<Array<any>>) => {
        // @ts-ignore
        state.questiondetail = action.payload
      }
    }
  })

  
  export const { saveTest, saveTestDetail, getAnswers, saveQuestionDetail} = testSlice.actions;
  
  export const getTest = () => async (dispatch: Dispatch) => {
        try {
          const response = await axios.get('https://646cfa217b42c06c3b2c5ef7.mockapi.io/test');
          console.log(response.data)
          dispatch(saveTest(response.data));
        } catch (e) {
          console.log(e);
        }
  }
  export const getTestDetail = (id:number) => async (dispatch: Dispatch) => {
        try {
          const response = await axios.get('https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/'+(id)+'/question');
          console.log(response.data)
          dispatch(saveTestDetail(response.data));
        } catch (e) {
          console.log(e);
        }
  }

  export const getQuestionDetail = (testId:number, quesId:number) => async (dispatch: Dispatch) => {
        try {
          const response = await axios.get('https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/'+(testId)+'/question/'+(quesId));
          console.log(response.data)
          dispatch(saveQuestionDetail(response.data));
        } catch (e) {
          console.log(e);
        }
  }
  
  
  export default testSlice.reducer
  