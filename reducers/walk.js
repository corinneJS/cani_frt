import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { walks: [], itineraries: [] },
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
        state.value.itineraries.push(action.payload);
      },
    /* removeitineraries: (state, action) => {
        state.value.itineraries = state.value.itineraries.filter(e => e.name !== action.payload);
      },
    importitineraries: (state, action) => {
        state.value.itineraries = action.payload;
      }, */

  },
});

export const { addWalk, removeWalk, importWalks, addItinerary } = walkSlice.actions;
export default walkSlice.reducer;