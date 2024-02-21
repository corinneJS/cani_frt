import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  traits:[{
    traitID:"",
    traitName: "",
    description: "",
    photoUrl: "",
    breedID:"",
  }]
};


export const traitsSlice = createSlice({
  name: "traits",
  initialState,
  reducers: {
    
    addTrait: (state, action) => {
      state.traits.push(action.payload);
    },
    // Action pour supprimer un chien
    removeTrait: (state, action) => {
      const index = state.traits.findIndex(trait => trait.traitID === action.payload.traitID);
      if (index !== -1) {
        state.traits.splice(index, 1);
      }
    },
    // Action pour mettre à jour la liste entière
    updateTraitList: (state, action) => {
      state.traits = action.payload;
    },
  
    resetTraitsStore: () => initialState,
    traitList: (state, action) => {
      state.value.traitName = action.payload.traitName; // KB : bonne pratique sécurité préférer le session storage
      state.value.description = action.payload.description;
      state.value.photoUrl = action.payload.PhotoUrl;
      state.value.breedID = action.payload.breedID;
    },
    traitDogList: (state, action) => {
      state.value.traitID = action.payload.traitID; 
      state.value.traitName = action.payload.traitName;
      state.value.description = action.payload.description;
      state.value.photoUrl = action.payload.PhotoUrl;
      state.value.breedID = action.payload.breedID;
      
    }
  },
});

export const {  } = traitsSlice.actions;
export default traitsSlice.reducer;
Traits