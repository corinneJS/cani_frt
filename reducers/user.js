import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: { token: null, username: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    infoUser: (state, action) => {
      state.value.token = action.payload.token; // KB : bonne pratique sécurité préférer le seesion storage
      state.value.userID = action.payload._id;
      state.value.isConnect = action.payload.isConnect;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.isDogOwner = action.payload.isDogOwner;
      state.value.isProfessional = action.payload.isProfessional;
      state.value.city = action.payload.city;
    },

    logout: (state) => {
     state.value.token = ""; // KB : bonne pratique sécurité préférer le seesion storage
     state.value.userID = "";
     state.value.isConnect = false;
     state.value.username = "";
     state.value.email = "";
     state.value.isDogOwner = false;
     state.value.isProfessional = false;
     state.value.city = "";
    
    },
  },
});

export const { infoUser, logout } = userSlice.actions;
export default userSlice.reducer;
