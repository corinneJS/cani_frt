import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: { token: null, username: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    infoUser: (state, action) => {
      state.value.token = action.payload.token;
      state.value.isConnect = action.payload.isConnect;
      state.value.firstname = action.payload.firstname;
      state.value.email = action.payload.email;
      state.value.isOwnerDog = action.payload.isOwnerDog;
      state.value.isProfessional = action.payload.isProfessional;
      state.value.city = action.payload.city;
    },

    logout: (state) => {
     state.value.token = "";
     state.value.isConnect = false;
     state.value.firstname = "";
     state.value.email = "";
     state.value.isOwnerDog = true;
     state.value.isProfessional = false;
     state.value.city = ""; 
    
    },
  },
});

export const { infoUser, logout } = userSlice.actions;
export default userSlice.reducer;
// const initialState = {
//  value: {nickname: null},
// };

// export const userSlice = createSlice({
//  name: 'user',
//   initialState,
//  reducers: {
//     updateNickname: (state, action) => {
//      state.value.nickname = action.payload;
//    },
//  },
// });

// export const { updateNickname } = userSlice.actions;
// export default userSlice.reducer;