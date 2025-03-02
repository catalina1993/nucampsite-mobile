import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const campsiteId = action.payload;
      if (state.includes(campsiteId)) {
        return state.filter((id) => id !== campsiteId); 
      } else {
        return [...state, campsiteId]; 
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
