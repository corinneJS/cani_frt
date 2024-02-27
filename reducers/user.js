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
      state.value.userID = action.payload.userID;
      state.value.isConnect = action.payload.isConnect;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.isDogOwner = action.payload.isDogOwner;
      state.value.isProfessional = action.payload.isProfessional;
      state.value.city = action.payload.city;
      state.value.photos = action.payload.photos;
    },

    logout: (state) => {
     state.value.token = ""; // KB : bonne pratique sécurité préférer le seesion storage
     state.value.userID = "";
     state.value.isConnect = false;
     state.value.username = "";
     state.value.email = "";
     
    
    },
  },
});

export const { infoUser, logout } = userSlice.actions;
export default userSlice.reducer;
