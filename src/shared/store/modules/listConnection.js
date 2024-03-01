import { createSlice } from '@reduxjs/toolkit';

const connectionList = createSlice({
  name: 'connection',
  initialState: {
    name: '',
    isClick: false
  },
  reducers: {
    connection: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const { connection } = connectionList.actions;
export default connectionList.reducer;
