import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = {};

//instance
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    //actionCreator + reducer
    addTodo: (state, action) => {
      //추가하기
      return [...state, action.payload];

      // state.push(action.payload);  immer 기능으로 인해 불변성이 지켜진다.
    },
    removeTodo: (state, action) => {
      //삭제하기
      return state.filter((item) => item.id !== action.payload);
    },
    switchTodo: (state, action) => {
      //수정하기
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    }
  }
});

export const { addTodo, removeTodo, switchTodo } = todoSlice.actions;
export default todoSlice.reducer;
