import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { walks: [], itineraries: [], markers:[], mapPositionCentered:[], },
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
    addMapPositionCentered: (state, action) => {
      state.value.mapPositionCentered = action.payload;
  },

  },
});

export const { addWalk, removeWalk, importWalks, addItinerary, addMarkers, addMapPositionCentered } = walkSlice.actions;
export default walkSlice.reducer;