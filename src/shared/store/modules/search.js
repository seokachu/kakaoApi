import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    changeSearchText: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const { changeSearchText } = searchSlice.actions; //상태 변경시키는 액션 보내주는곳
export default searchSlice.reducer; //리듀서 부분 넘겨주는곳
