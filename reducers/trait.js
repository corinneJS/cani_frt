import Constants from "expo-constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Création d'un thunk asynchrone
export const fetchTraitsAsync = createAsyncThunk(
  "traits/fetchTraits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${Constants.expoConfig.extra.EXPO_PUBLIC_BASE_URL}traits/`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialTraitState = {
  traits: [
    {
      traitID: "",
      traitName: "",
      description: "",
      photoUrl: "",
      breedID: "",
    },
  ],
};

export const traitsSlice = createSlice({
  name: "traits",
  initialState: { initialTraitState, status: "idle", error: null },
  reducers: {
    addTrait: (state, action) => {
      state.traits.push(action.payload);
    },
    // Action pour supprimer un caractère
    removeTrait: (state, action) => {
      const index = state.traits.findIndex(
        (trait) => trait.traitID === action.payload.traitID
      );
      if (index !== -1) {
        state.traits.splice(index, 1);
      }
    },
    // Action pour mettre à jour la liste entière
    updateTraitList: (state, action) => {
      state.traits = action.payload;
    },
    // Action pour reset le caractère
    resetTraitStore: () => initialState,

    //
    traitList: (state, action) => {
      state.value.traitID = action.payload.traitID;

      state.value.traitName = action.payload.traitName;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTraits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dogs = action.payload;
      })
      .addCase(fetchTraits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addTrait,
  removeTrait,
  updateTraitList,
  resetTraitStore,
  traitList,
  traitDogList,
} = traitsSlice.actions;
export default traitsSlice.reducer;
Traits;
