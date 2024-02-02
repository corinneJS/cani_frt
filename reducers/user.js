import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {nickname: null},
};

export const userSlice = createSlice({
 name: 'user',
  initialState,
 reducers: {
    updateNickname: (state, action) => {
     state.value.nickname = action.payload;
   },
 },
});

export const { updateNickname } = userSlice.actions;
export default userSlice.reducer;