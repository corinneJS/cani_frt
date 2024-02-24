import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: {
    dogName: "",
    description: "",
    birthdate: new Date,
    isFemale: false,
    isSterilized: false,
    traitID: [],
    activityID: [],
    dateCreated: new Date,
    dateModified: new Date,
    dogPhotos: [
      {uri: String,
    dogPhotoName: String,
    isProfilPhoto: Boolean}],
    userID: "",
    breedID: "",
    dogID:"",
  }
};


export const dogSlice = createSlice({
  name: "dog",
  initialState,
  reducers: {
    resetDogStore: () => initialState,
    infoDog: (state, action) => {
      state.value.dogID = action.payload.dogID;
      state.value.dogName = action.payload.dogName;
      state.value.description = action.payload.description;
      state.value.birthdate = action.payload.birthdate;
      state.value.userID = action.payload.userID;
      state.value.isFemale = action.payload.isFemale;
      state.value.isSterilized = action.payload.isSterilized;
      state.value.traitID = action.payload.traitID;
      state.value.activityID = action.payload.activityID;
      state.value.dateCreated = action.payload.dateCreated;
      state.value.dogPhotos = action.payload.dogPhotos;
      state.value.dateModified = action.payload.dateModified;
      state.value.breedID = action.payload.breedID;
    },
    
    








  },
});

export const { infoDog, resetDogStore } = dogSlice.actions;
export default dogSlice.reducer;
