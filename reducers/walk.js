import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { walks: [], itineraries: [], markers:[] },
};

export const walkSlice = createSlice({
  name: 'walk',
  initialState,
  reducers: {
    addWalk: (state, action) => {
      state.value.walks.push(action.payload);
    },
    removeWalk: (state, action) => {
      state.value.walks = state.value.walks.filter(e => e.name !== action.payload);
    },
    importWalks: (state, action) => {
      state.value.itineraries = action.payload;
    },
    addItinerary: (state, action) => {
        state.value.itineraries = action.payload;
      },
    addMarkers: (state, action) => {
        state.value.markers.push(action.payload);
    },

  },
});

export const { addWalk, removeWalk, importWalks, addItinerary, addMarkers } = walkSlice.actions;
export default walkSlice.reducer;